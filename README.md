# Intowow preroll ad plugin for Clappr player

This plugin is supported __ONLY__ by Clappr version `0.2.87` or greater.

On mobile devices, it support only [Clappr playbacks](https://github.com/clappr/clappr/tree/master/src/playbacks) which use an HTML5 video element.

# Usage

Add Clappr script to your HTML:

```html
<head>
  <script type="text/javascript" src="https://cdn.jsdelivr.net/npm/clappr@latest/dist/clappr.min.js"></script>
</head>
```

Build plugin into your bundle.

Then just add `ClapprIntowowPrerollPlugin` into the list of plugins of your player instance, and the options for the plugin go in the `intowowPrerollPlugin` property as shown below.

```javascript
var player = new Clappr.Player({
  source: "http://your.video/here.mp4",
  autoPlay: false, // Set to false and use plugin autostart option (or set to true if tag is false)
  plugins: {
    core: [ClapprIntowowPrerollPlugin],
  },
  intowowPrerollPlugin: {
    placement: 'INTOWOW_PLACEMENT_TAG',
    // events: { /* Event map */ },
    // imaLoadTimeout: 3000, // Default is 6000 milliseconds
    // nonLinearDuration: 20000, // Default is 15000 milliseconds
    // maxDuration: 30000, // Default is false (DISABLED)
    // locale: 'fr', // Any two-letter ISO 639-1 code. Default is false (Do not setup)
    // disableLoader: true, // Default is false (Loader is enabled)
  }
});
```

## Events

For more details, see [Google IMA events types](https://developers.google.com/interactive-media-ads/docs/sdks/html5/v3/apis#values_3).

```javascript
  // [...]
  intowowPrerollPlugin: {
    events: {
      content_resume_requested: function() { console.log('content_resume_requested') },
      content_pause_requested: function() { console.log('content_pause_requested') },
      loaded: function() { console.log('loaded') },
      click: function() { console.log('click') },
      impression: function() { console.log('impression') },
      started: function() { console.log('started') },
      first_quartile: function() { console.log('first_quartile') },
      midpoint: function() { console.log('midpoint') },
      third_quartile: function() { console.log('third_quartile') },
      complete: function() { console.log('complete') },
      paused: function() { console.log('paused') },
      resumed: function() { console.log('resumed') },
      skipped: function() { console.log('skipped') },
      user_close: function() { console.log('user_close') },
      ad_error: function(e) { console.log('ad_error: ' + e.getError()) }, // AdErrorEvent
      error: function(e) { console.log('error', e) },
    }
  }
  // [...]
```

# Development

Install dependencies :

```shell
  yarn install
```

Start HTTP dev server (http://0.0.0.0:8080) :

```shell
  yarn run start
```
