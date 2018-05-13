'use strict';

import {
  TextureLoader
} from 'three';

export function Loader() {

  let isLoading = false;
  let totalToLoad = 0;
  let numLoaded = 0;
  let numFailed = 0;
  let success_cb = (any) => any;
  let progress_cb = (p) => p;
  let error_cb = (e) => e;
  let done_cb = (ok) => ok;
  let assets = {
    images: {},
    text: {},
    textures: {}
  };

  function tryDone() {
    if (!isLoading)
      return true;
    if (numLoaded + numFailed >= totalToLoad) {
      const ok = !numFailed;
      if (ok && success_cb) success_cb(assets);
      done_cb && done_cb(ok);
      isLoading = false;
    }
    return !isLoading;
  }

  function doProgress() {
    numLoaded += 1;
    progress_cb && progress_cb(numLoaded / totalToLoad);
    tryDone();
  }

  function doError(e) {
    error_cb && error_cb(e);
    numFailed += 1;
    tryDone();
  }

  function loadText(ad) {
    // console.log('loading ' + ad.url);
    const req = new XMLHttpRequest();
    req.overrideMimeType('*/*');
    req.onreadystatechange = function () {
      if (req.readyState === 4) {
        if (req.status === 200) {
          assets.text[ad.name] = req.responseText;
          // console.log('loaded ' + ad.name);
          doProgress();
        } else {
          doError('Error ' + req.status + ' loading ' + ad.url);
        }
      }
    };
    req.open('GET', ad.url);
    req.send();
  }

  function loadImage(ad) {
    const img = new Image();
    assets.images[ad.name] = img;
    img.onload = doProgress;
    img.onerror = doError;
    img.src = ad.url;
  }

  function loadTexture(ad) {
    assets.textures[ad.name] = new TextureLoader().load(ad.url, doProgress);
  }

  /**
   * Start loading a list of assets
   */
  function load(
    assetList,
    success,
    progress,
    error,
    done
  ) {
    success_cb = success;
    progress_cb = progress;
    error_cb = error;
    done_cb = done;
    totalToLoad = 0;
    numLoaded = 0;
    numFailed = 0;
    isLoading = true;

    if (assetList.text) {
      totalToLoad += assetList.text.length;
      for (let i = 0; i < assetList.text.length; ++i) {
        loadText(assetList.text[i]);
      }
    }
    if (assetList.images) {
      totalToLoad += assetList.images.length;
      for (let i = 0; i < assetList.images.length; ++i) {
        loadImage(assetList.images[i]);
      }
    }
    if (assetList.textures) {
      totalToLoad += assetList.textures.length;
      for (let i = 0; i < assetList.textures.length; ++i) {
        loadTexture(assetList.textures[i]);
      }
    }
  }

  /**
   *  Public interface
   */
  return {
    load: load,
    getAssets: () => assets
  };

} // end Loader
