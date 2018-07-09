zuix.store("config", {
    "title": "WebBook",
    "googleSiteId": "UA-123-456",
    "resourcePath": "./app/",
    "drawerWidth": 300,
    "libraryPath": "http://192.168.2.104:8081/lib"
});

    // Check that service workers are registered
    if ('serviceWorker' in navigator) {
        // Use the window load event to keep the page load performant
        window.addEventListener('load', () => {
            navigator.serviceWorker.register('./service-worker.js');
        });
    }
    