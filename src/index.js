import {UICorePlugin, Mediator, Events, Browser, Styler, $} from 'clappr'
import pluginStyle from './style.sass'
import {svg, mp4} from './dummy'
import imaLoader from './ima-loader'
import playSvg from './play.svg'   // 01-play.svg icon from Clappr player
import loadSvg from './loader.svg' // http://articles.dappergentlemen.com/2015/01/13/svg-spinner/
import adIcon from './ad_icon.png'

export default class ClapprIntowowPrerollPlugin extends UICorePlugin {
  get name() { return 'intowow-preroll-plugin' }

  get attributes() {
    return {
      'class': this.name,
      'data-preroll': ''
    }
  }

  get cfg() {
    return this.options.intowowPrerollPlugin || {}
  }

  constructor(core) {
    super(core)
    this._imaIsloading = false
    this._imaIsloaded = false
    this._imaLoadResult = false
    this._pluginIsReady = false
    this._controlsDisabled = false
    this._isLoadingContent = false
  }

  bindEvents() {
    this.listenTo(this.core.mediaControl, Events.MEDIACONTROL_CONTAINERCHANGED, this._onMediaControlContainerChanged)
    this.listenTo(this.core, Events.CORE_READY, this._onCoreReady)
    Mediator.on(`${this.core.options.playerId}:${Events.PLAYER_RESIZE}`, this._onPlayerResize, this)
  }

  _onMediaControlContainerChanged() {
    this.core.mediaControl.container.$el.append(this.el)
  }

  _onCoreReady() {
    // Since Clappr 0.2.84, "CORE_READY" event is trigerred after create container on load
    this._resetMaxDurationTimer()
    this._resetNonLinearTimer()
    this._resetPlugin()
    this._configure()
    this._loadImaSDK()
    this._initPlugin()
  }

  _onPlayerResize(evt) {
    // Signal player resize to ads manager
    this._adsManager && this._adsManager.resize(this._contentElement.offsetWidth, this._contentElement.offsetHeight, google.ima.ViewMode.NORMAL)
  }

  _pluginError(msg) {
    let e = new Error(this.name + ': ' + msg)
    this._imaEvent('error', e)
    throw e
  }

  _configure() {
    this._placement = this.cfg.placement || false
    this._passbackAdTagUrl = this.cfg.passbackAdTagUrl
    this._autostart = false
    this._events = $.isPlainObject(this.cfg.events) ? this.cfg.events : {}
    this._vpaid = 2
    this._nonLinearDuration = this.cfg.nonLinearDuration > 0 ? this.cfg.nonLinearDuration : 15000 // Default is 15 seconds
    this._imaLoadtimeout = this.cfg.imaLoadTimeout > 0 ? this.cfg.imaLoadTimeout : 6000 // Default is 6 seconds
    this._usePosterIcon = !!this.cfg.usePosterIcon
    this._maxDuration = this.cfg.maxDuration > 0 ? this.cfg.maxDuration : false // Default is disabled
    this._locale = this.cfg.locale ? this.cfg.locale : false // Default is to not set custom locale
    this._disableLoader = this.cfg.disableLoader ? this.cfg.disableLoader : false // Default is false (Loader is enabled)
    // TODO: Add an option which is an array of plugin name to disable
  }

  _resetPlugin() {
    this._playVideoContentRequested = false
  }

  _loadImaSDK() {
    // Ensure is lazy loaded once (only if tag is filled)
    if (this._imaIsloading || this._imaIsloaded || !this._placement) return

    this._imaIsloading = true
    imaLoader((result) => {
      this._imaLoadResult = result
      this._imaIsloading = false
      this._imaIsloaded = true
      this._initImaSDK()
    }, true, this._imaLoadtimeout)
  }

  _disableControls() {
    this.core.disableMediaControl()
    this._posterPlugin && this._posterPlugin.disable()
    this._clickToPausePlugin && this._clickToPausePlugin.disable()
    this._container.stopListening()
    this._controlsDisabled = true
  }

  _enableControls() {
    if (this._controlsDisabled) {
      this._clickToPausePlugin && this._clickToPausePlugin.enable()
      this._posterPlugin && this._posterPlugin.enable()
      this.core.enableMediaControl()
      this._controlsDisabled = false
    }
  }

  _initPlugin() {
    this._pluginIsReady = false

    // Ensure not loading video content (after ad played)
    if (this._isLoadingContent) {
      this._isLoadingContent = false
      this.$el.hide()

      return
    }

    this._cleanup()

    // Get current playback. (To get playback element)
    this._playback = this.core.getCurrentPlayback()
    if (!this._playback) {
      this._pluginError('failed to get Clappr playback')
    }

    // Get current container. (To disable bindings during ad playback)
    this._container = this.core.getCurrentContainer()
    if (!this._container) {
      this._pluginError('failed to get Clappr current container')
    }

    // Ensure plugin configuration has VAST tag
    if (!this._placement) {
      // Handle content autoplay if no tag
      if (!this.options.autoPlay && this._autostart) {
        this._container.play()
      }

      return
    }

    // Ensure playback is using HTML5 video element if mobile device
    if (this._playback.tagName !== 'video' && Browser.isMobile) return

    // Ensure browser can play video content. (Avoid to display an ad with nothing after)
    if (this._playback.name === 'no_op') return

    this.$el.show()
    this._$clickOverlay.show()

    // Attempt to get poster plugin. (May interfere with media control)
    this._posterPlugin = this._container.getPlugin('poster')

    // Attempt to capture poster play svg icon
    if (this._posterPlugin && this._usePosterIcon) {
      let svg = this._posterPlugin.$el.find('svg')
      if (svg[0]) {
        this._playSvg = svg[0]
      }
    }

    // Attempt to get click-to-pause plugin. (May interfere with advert click handling)
    this._clickToPausePlugin = this._container.getPlugin('click_to_pause')

    // Disable Clappr during ad playback
    process.nextTick(() => this._disableControls())

    // Attempt to get error screen plugin. (May interfere with dummy source switch)
    this._errorScreenPlugin = this.core.getPlugin('error_screen')

    // Disable error screen plugin (will be re-enabled when source reloaded)
    this._errorScreenPlugin && this._errorScreenPlugin.disable()

    this._contentElement = this._playback.el
    this._useDummyMp4Video = false
    this._useBlackSvgPixel = false

    let src = this._playback.el && this._playback.el.src
    if (!src || src.length === 0) {
      // Ensure video element has one source loaded (expected by most of ad SDK libraries)
      // This is required if loaded source is a .m3u8 handled by hls.js playback (src is empty)
      this._playback.el.src = mp4
      this._useDummyMp4Video = true
    } else if (this._playback.name === 'html5_video' && !this._playback.el.hasAttribute('poster'))  {
      // Hide video source preview using a black 1 pixel video poster. (Smoother user experience on iOS/MacOSX)
      this._playback.el.poster = svg
      this._useBlackSvgPixel = true
    }

    // Note that some ad SDK may also change the video element styles without properly restoring state after ad playback.
    // A possible enhancement could be also to backup element styles and restore them after ad playback.

    this._pluginIsReady = true
    this._initImaSDK()
  }

  _createImaContainer() {
    this._destroyImaContainer()
    // IMA does not clean ad container when finished
    // For the sake of simplicity, wrap into a <div> element
    if (this._adContainer) {
      this._imaContainer = $("<div />").addClass("ima-container").attr('data-preroll', '')[0]
      this._adContainer.appendChild(this._imaContainer)
    }
  }

  _destroyImaContainer() {
    if (this._imaContainer && this._adContainer) {
      this._adContainer.removeChild(this._imaContainer)
      delete this._imaContainer
    }
  }

  _createAdDisplayContainer() {
    this._createImaContainer()
    this._destroyAdDisplayContainer()
    this._adDisplayContainer = new google.ima.AdDisplayContainer(this._imaContainer, this._contentElement)
  }

  _destroyAdDisplayContainer() {
    if (this._adDisplayContainer) {
      this._adDisplayContainer.destroy()
      delete this._adDisplayContainer
    }
  }

  _vpaidMode() {
    // For more details, read https://developers.google.com/interactive-media-ads/docs/sdks/html5/vpaid2js#enabling
    if (this._vpaid === 0)
      return google.ima.ImaSdkSettings.VpaidMode.DISABLED

    if (this._vpaid > 1)
      return google.ima.ImaSdkSettings.VpaidMode.INSECURE

    return google.ima.ImaSdkSettings.VpaidMode.ENABLED
  }

  _initImaSDK() {
    if (!this._imaIsloaded || !this._pluginIsReady) {
      return
    }

    // Skip ad scenario if IMA SDK is not successfully loaded
    // May happen if user has ad blocker, or Google server unavailable
    if (!this._imaLoadResult) {
      this._imaEvent('error', new Error('Failed to load IMA SDK'))
      this._playVideoContent()

      return
    }

    // Setup VPAID support
    google.ima.settings.setVpaidMode(this._vpaidMode())

    // Setup provided locale
    this._locale && google.ima.settings.setLocale(this._locale)

    this._setupOverlay()
  }

  _destroyAdsLoader() {
    if (this._adsLoader) {
      this._adsLoader.contentComplete()
      this._adsLoader.destroy()
      delete this._adsLoader
    }
  }

  _loadIMARequest(adsRequest) {
    return new Promise((resolve, reject) => {
      // Destroy any previously created ads loader instance
      // IMA guidelines are to use the same AdsLoader instance for the entire
      // lifecycle of your page, but Clappr may create a new video element if
      // configure() method is called with a source.
      this._destroyAdsLoader();
      this._adsLoader = new google.ima.AdsLoader(this._adDisplayContainer);
      this._adsLoader.getSettings().setDisableCustomPlaybackForIOS10Plus(true);
      this._adsLoader.addEventListener(google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED, (e) => {
        resolve(e);
      });
      this._adsLoader.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (e) => {
        var error = new Error();
        error.event = e;
        reject(error);
      });
      
      adsRequest.linearAdSlotWidth = this._contentElement.offsetWidth;
      adsRequest.linearAdSlotHeight = this._contentElement.offsetHeight;
      adsRequest.nonLinearAdSlotWidth = this._contentElement.offsetWidth;
      adsRequest.nonLinearAdSlotHeight = this._contentElement.offsetHeight;
      // Assume playback is consented by user
      adsRequest.setAdWillAutoPlay(true);
      adsRequest.setAdWillPlayMuted(false);
      // requestAds() trigger _onAdsManagerLoaded() or _onAdError()
      this._adsLoader.requestAds(adsRequest);
    });
  }

  _destroyAdsManager() {
    if (this._adsManager) {
      this._adsManager.destroy()
      delete this._adsManager
    }
  }

  _requestAd () {
    let render = (ad) => {
      let adsRequest = new google.ima.AdsRequest();
      adsRequest.adTagUrl = ad.adTagUrl;
      adsRequest.adsResponse = ad.adsResponse;

      return this._loadIMARequest(adsRequest).then((event) => {
        this._onAdsManagerLoaded(event, ad.eventListener)
      }, (err) => {
        const adErrorEvent = err.event
        // google.ima.AdErrorEvent : https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdErrorEvent
        // google.ima.AdError : https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#ima.AdError
        this._imaEvent('ad_error', adErrorEvent)
        throw err
      })
    }

    window.intowow.cmd.push(() => {
      new Promise((resolve, reject) => {
        resolve(window.intowow.load({
          placement: this._placement,
          timeout: this._imaLoadtimeout,
          source: this.core.options.source,
          render: render
        }))
      })
      .catch((err) => {
        if (this._passbackAdTagUrl) {
          return render({
            adTagUrl: this._passbackAdTagUrl,
            eventListener: {
              emit: function () {}
            }
          })
        } else {
          throw err
        }
      }).then(null, () => {
        this._playVideoContent()
      })
    })
  }

  _emitVideoEvent({ event, percentage, adDuration, eventListener }) {
    eventListener.emit(event, {
      duration: adDuration * percentage / 100,
      adDuration,
      percentage
    })
  }

  _createWidgets () {
    var isVpaid = this._adsManager.getCurrentAd().getApiFramework() !== null
    if (isVpaid) {
      return
    }

    var isMobile = navigator.userAgent.indexOf('Mobi') !== -1
    if (isMobile) {
      return
    }

    var widgets = [{
      destroy: function () {
        this.view.parentElement.removeChild(this.view)
        this.view.removeEventListener()
        delete this.view
      },
      getView: function () {
        var scale = 1
        this.view = document.createElement('div')
        Object.assign(this.view.style, {
          height: '20px',
          width: '20px',
          position: 'absolute',
          right: 0,
          top: 0,
          margin: '15px 35px',
          fontSize: `${16 * scale}px`,
          lineHeight: `${12 * scale}pt`,
          color: 'white'
        })
        this.view.innerText = '00:00'
        return this.view
      },
      update ({ time, volume }) {
        const progress = isNaN(time) ? 0 : Math.max(0, time)
        let min = '' + Math.floor(progress / 60)
        if (min.length === 1) {
          min = '0' + min
        }

        let sec = '' + Math.floor(progress % 60)
        if (sec.length === 1) {
          sec = '0' + sec
        }

        this.view.innerText = `${min}:${sec}` 
      }
    }]

    this._intowowWidgets = widgets
    var overlay = this.$el[0]
    for (const widget of this._intowowWidgets) {
      overlay.appendChild(widget.getView())
    }

    this._widgetTimer = setInterval(() => {
      var state = {
        time: this._adsManager.getRemainingTime(),
        volume: this._adsManager.getVolume()
      }
      for (const widget of widgets) {
        widget.update(state)
      }
    }, 200)

    var wrapper = document.createElement('div')
    var img = document.createElement('img')
    img.src = adIcon
    Object.assign(img.style, {
      width: '20px',
      height: '20px',
      position: 'absolute',
      right: '0',
      top: '0'
    })
    wrapper.appendChild(img)

    overlay.appendChild(wrapper)
  }

  _destroyWidgets () {
    if (!this._intowowWidgets) {
      return
    }

    clearInterval(this._widgetTimer)

    for (const widget of this._intowowWidgets) {
      widget.destroy()
    }
    delete this._intowowWidgets
  }

  _onAdError (err) {
    console.error(err)
  }

  _onAdsManagerLoaded(adsManagerLoadedEvent, eventListener) {
    let adsRenderingSettings = new google.ima.AdsRenderingSettings()

    // Plugin will handle playback state when ad has completed
    adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = false

    // Destroy any previously created ads manager
    this._destroyAdsManager()

    this._adsManager = adsManagerLoadedEvent.getAdsManager(this._contentElement, adsRenderingSettings)

    let adDuration = 0

    this._adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, (e) => {
      this._onAdError(e)
    })

    this._adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED, () => {
      this._destroyWidgets()
      this._imaEvent('content_resume_requested')
      this._playVideoContent()
    })

    this._adsManager.addEventListener(google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED, () => {
      this._imaEvent('content_pause_requested')
    })

    this._adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, () => {
      this._imaEvent('loaded')
    })

    this._adsManager.addEventListener(google.ima.AdEvent.Type.CLICK, () => {
      const duration = adDuration - this._adsManager.getRemainingTime() * 1000
      this._emitVideoEvent({
        event: 'click',
        percentage: Math.ceil(duration / adDuration * 100),
        adDuration,
        eventListener
      })
      this._imaEvent('click')
    })

    this._adsManager.addEventListener(google.ima.AdEvent.Type.IMPRESSION, () => {
      adDuration = adDuration || Math.floor(1000 * this._adsManager.getRemainingTime())
      eventListener.emit('impression')
      this._imaEvent('impression')
    })

    this._adsManager.addEventListener(google.ima.AdEvent.Type.STARTED, (e) => {
      this._adsManager.setVolume(0.5)
      this._createWidgets()

      adDuration = adDuration || Math.floor(1000 * this._adsManager.getRemainingTime())
      if (! e.getAd().isLinear()) {
        // KNOWN ISSUE: non-linear ad is displayed *before* content for custom duration
        // FIXME: find a way to display it while playing content
        this._startNonLinearDurationTimer()
      } else {
        this._maxDuration && this._startMaxDurationTimer()
      }

      this._emitVideoEvent({
        event: 'video_view',
        percentage: 0,
        adDuration,
        eventListener
      })
      this._imaEvent('started')
    })

    this._adsManager.addEventListener(google.ima.AdEvent.Type.FIRST_QUARTILE, () => {
      this._emitVideoEvent({
        event: 'video_view',
        percentage: 25,
        adDuration,
        eventListener
      })
      this._imaEvent('first_quartile')
    })

    this._adsManager.addEventListener(google.ima.AdEvent.Type.MIDPOINT, () => {
      this._emitVideoEvent({
        event: 'video_view',
        percentage: 50,
        adDuration,
        eventListener
      })
      this._imaEvent('midpoint')
    })

    this._adsManager.addEventListener(google.ima.AdEvent.Type.THIRD_QUARTILE, () => {
      this._emitVideoEvent({
        event: 'video_view',
        percentage: 75,
        adDuration,
        eventListener
      })
      this._imaEvent('third_quartile')
    })

    this._adsManager.addEventListener(google.ima.AdEvent.Type.COMPLETE, () => {
      this._emitVideoEvent({
        event: 'video_view',
        percentage: 100,
        adDuration,
        eventListener
      })
      this._imaEvent('complete')
    })

    this._adsManager.addEventListener(google.ima.AdEvent.Type.PAUSED, () => {
      this._imaEvent('paused')
    })

    this._adsManager.addEventListener(google.ima.AdEvent.Type.RESUMED, () => {
      this._imaEvent('resumed')
    })

    this._adsManager.addEventListener(google.ima.AdEvent.Type.SKIPPED, () => {
      const duration = adDuration - this._adsManager.getRemainingTime() * 1000
      this._emitVideoEvent({
        event: 'skip',
        percentage: Math.ceil(duration / adDuration * 100),
        adDuration,
        eventListener
      })
      this._imaEvent('skipped')
    })

    this._adsManager.addEventListener(google.ima.AdEvent.Type.USER_CLOSE, () => {
      this._imaEvent('user_close')
    })

    var volumeState
    this._adsManager.addEventListener(google.ima.AdEvent.Type.VOLUME_CHANGED, () => {
      var newVolState = this._adsManager.getVolume() > 0 ? 'mute' : 'unmute'
      if (volumeState !== newVolState) {
        const duration = adDuration - this._adsManager.getRemainingTime() * 1000
        this._emitVideoEvent({
          event: newVolState,
          percentage: Math.ceil(duration / adDuration * 100),
          adDuration,
          eventListener
        })
        volumeState = newVolState
      }

      this._imaEvent('user_close')
    })

    this._playAds()
  }

  _onDurationTimeout() {
    this._imaEvent('error', new Error(`Maximum duration of ${this._maxDuration} ms reached`))

    if (this._adsManager) {
      // Signal ads manager to stop and get back to content
      this._adsManager.stop()
    } else {
      // Should never happen
      this._cleanup()
      this._playVideoContent()
    }
  }

  _startMaxDurationTimer() {
    this._maxDurationTimer = setTimeout(() => { this._onDurationTimeout() }, this._maxDuration)
  }

  _resetMaxDurationTimer() {
    if (typeof this._maxDurationTimer === 'number') {
      clearTimeout(this._maxDurationTimer)
      this._maxDurationTimer = undefined
    }
  }

  _startNonLinearDurationTimer() {
    this._nonLinearTimer = setTimeout(() => { this._playVideoContent() }, this._nonLinearDuration)
  }

  _resetNonLinearTimer() {
    if (typeof this._nonLinearTimer === 'number') {
      clearTimeout(this._nonLinearTimer)
      this._nonLinearTimer = undefined
    }
  }

  _imaEvent(eventName, e) {
    $.isFunction(this._events[eventName]) && this._events[eventName](e)
  }

  _setupOverlay() {
    // Ad start must be done as the result of a user action on mobile.
    // For more details, read https://developers.google.com/interactive-media-ads/docs/sdks/html5/mobile_video
    if (!this._autostart) {
      let startAd = (e) => {
        try {
          this._clickOverlay.removeEventListener('click', startAd, false)
          e.preventDefault()
          e.stopPropagation()
        } catch (err) {}

        this._disableLoader || this._setOverlayIcon(loadSvg)

        // Use playback "consent" feature to capture user action (Clappr 0.2.66 or greater)
        this._playback.consent()

        // Request ad
        this._createAdDisplayContainer()
        this._adDisplayContainer.initialize() // Must be called on overlay click
        this._requestAd()
      }

      this._setOverlayIcon(this._playSvg || playSvg)
      this._clickOverlay.addEventListener('click', startAd, false)

      return
    }

    // Otherwise, request ad
    this._disableLoader || this._setOverlayIcon(loadSvg)
    this._createAdDisplayContainer()
    this._adDisplayContainer.initialize()
    this._requestAd()
  }

  _playAds() {
    try {
      this._$clickOverlay.hide()
      this._adsManager.init(
        this._contentElement.offsetWidth,
        this._contentElement.offsetHeight,
        google.ima.ViewMode.NORMAL
      )
      this._adsManager.start()
    } catch (e) {
      // console.log('adsManager catched error', e)
      this._imaEvent('error', e)
      this._playVideoContent()
    }
  }

  _playVideoContent() {
    // Ensure video content playback is not already requested
    // This may happen with VPAID unexpected AdError
    if (this._playVideoContentRequested) return

    this._playVideoContentRequested = true
    this._resetMaxDurationTimer()
    this._resetNonLinearTimer()

    this._imaEvent('content_resume')

    process.nextTick(() => {
      this._enableControls()
      this.$el.hide()

      // Ensure recycleVideo playback option is enabled with mobile devices (Clappr 0.2.66 or greater)
      let playbackOptions = this.core.options.playback || {}
      playbackOptions.recycleVideo = Browser.isMobile

      // Signal loading video content
      this._isLoadingContent = true

      setTimeout(() => {
        this.core.configure({
          playback: playbackOptions,
          sources: this.core.options.sources,
          autoPlay: true, // Assume playback has user consent
        })
      }, 100)
    })
  }

  _remove() {
    if (this._$adContainer) {
      this._$adContainer.remove()
    }
    if (this._$clickOverlay) {
      this._$clickOverlay.remove()
    }
  }

  render() {
    this._remove()
    this._$adContainer = $("<div />").addClass("preroll-container").attr('data-preroll', '')
    this._$clickOverlay = $("<div />").addClass("preroll-overlay").attr('data-preroll', '')
    this.$el.append(this._$adContainer)
    this.$el.append(this._$clickOverlay)
    this.$el.append(Styler.getStyleFor(pluginStyle))
    this._adContainer = this._$adContainer[0]
    this._clickOverlay = this._$clickOverlay[0]

    return this
  }

  _setOverlayIcon(icon) {
    let svg = this._$clickOverlay.find('svg')
    if (svg[0]) {
      this._$clickOverlay.find('svg').replaceWith(icon)
    } else {
      this._$clickOverlay.append(icon)
    }
    this._$clickOverlay.find('svg path').css('fill', '#fff')
    this._$clickOverlay.find('svg').addClass('preroll-overlay-icon').attr('data-preroll', '')
  }

  _cleanup() {
    this._destroyAdsLoader()
    this._destroyAdDisplayContainer()
    this._destroyAdsManager()
    this._destroyImaContainer()
    this.$el.hide()
  }

  destroy() {
    this._cleanup()
    super.destroy()
  }
}
