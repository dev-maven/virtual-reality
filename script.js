(function(){
    var script = {
 "start": "this.init(); this.visibleComponentsIfPlayerFlagEnabled([this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A], 'gyroscopeAvailable'); this.syncPlaylists([this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist,this.mainPlayList]); if(!this.get('fullscreenAvailable')) { [this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0].forEach(function(component) { component.set('visible', false); }) }",
 "id": "rootPlayer",
 "defaultVRPointer": "laser",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.MainViewer",
  "this.Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
  "this.Container_0DD1BF09_1744_0507_41B3_29434E440055",
  "this.Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
  "this.Container_062AB830_1140_E215_41AF_6C9D65345420",
  "this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8",
  "this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
  "this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
  "this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
  "this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169",
  "this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
  "this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC"
 ],
 "scrollBarWidth": 10,
 "mobileMipmappingEnabled": false,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "vrPolyfillScale": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 20,
 "shadow": false,
 "layout": "absolute",
 "buttonToggleFullscreen": "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "overflow": "visible",
 "paddingRight": 0,
 "downloadEnabled": false,
 "class": "Player",
 "scripts": {
  "fixTogglePlayPauseButton": function(player){  var state = player.get('state'); var buttons = player.get('buttonPlayPause'); if(typeof buttons !== 'undefined' && player.get('state') == 'playing'){ if(!Array.isArray(buttons)) buttons = [buttons]; for(var i = 0; i<buttons.length; ++i) buttons[i].set('pressed', true); } },
  "setMainMediaByIndex": function(index){  var item = undefined; if(index >= 0 && index < this.mainPlayList.get('items').length){ this.mainPlayList.set('selectedIndex', index); item = this.mainPlayList.get('items')[index]; } return item; },
  "updateMediaLabelFromPlayList": function(playList, htmlText, playListItemStopToDispose){  var changeFunction = function(){ var index = playList.get('selectedIndex'); if(index >= 0){ var beginFunction = function(){ playListItem.unbind('begin', beginFunction); setMediaLabel(index); }; var setMediaLabel = function(index){ var media = playListItem.get('media'); var text = media.get('data'); if(!text) text = media.get('label'); setHtml(text); }; var setHtml = function(text){ if(text !== undefined) { htmlText.set('html', '<div style=\"text-align:left\"><SPAN STYLE=\"color:#FFFFFF;font-size:12px;font-family:Verdana\"><span color=\"white\" font-family=\"Verdana\" font-size=\"12px\">' + text + '</SPAN></div>'); } else { htmlText.set('html', ''); } }; var playListItem = playList.get('items')[index]; if(htmlText.get('html')){ setHtml('Loading...'); playListItem.bind('begin', beginFunction); } else{ setMediaLabel(index); } } }; var disposeFunction = function(){ htmlText.set('html', undefined); playList.unbind('change', changeFunction, this); playListItemStopToDispose.unbind('stop', disposeFunction, this); }; if(playListItemStopToDispose){ playListItemStopToDispose.bind('stop', disposeFunction, this); } playList.bind('change', changeFunction, this); changeFunction(); },
  "setMediaBehaviour": function(playList, index, mediaDispatcher){  var self = this; var stateChangeFunction = function(event){ if(event.data.state == 'stopped'){ dispose.call(this, true); } }; var onBeginFunction = function() { item.unbind('begin', onBeginFunction, self); var media = item.get('media'); if(media.get('class') != 'Panorama' || (media.get('camera') != undefined && media.get('camera').get('initialSequence') != undefined)){ player.bind('stateChange', stateChangeFunction, self); } }; var changeFunction = function(){ var index = playListDispatcher.get('selectedIndex'); if(index != -1){ indexDispatcher = index; dispose.call(this, false); } }; var disposeCallback = function(){ dispose.call(this, false); }; var dispose = function(forceDispose){ if(!playListDispatcher) return; var media = item.get('media'); if((media.get('class') == 'Video360' || media.get('class') == 'Video') && media.get('loop') == true && !forceDispose) return; playList.set('selectedIndex', -1); if(panoramaSequence && panoramaSequenceIndex != -1){ if(panoramaSequence) { if(panoramaSequenceIndex > 0 && panoramaSequence.get('movements')[panoramaSequenceIndex-1].get('class') == 'TargetPanoramaCameraMovement'){ var initialPosition = camera.get('initialPosition'); var oldYaw = initialPosition.get('yaw'); var oldPitch = initialPosition.get('pitch'); var oldHfov = initialPosition.get('hfov'); var previousMovement = panoramaSequence.get('movements')[panoramaSequenceIndex-1]; initialPosition.set('yaw', previousMovement.get('targetYaw')); initialPosition.set('pitch', previousMovement.get('targetPitch')); initialPosition.set('hfov', previousMovement.get('targetHfov')); var restoreInitialPositionFunction = function(event){ initialPosition.set('yaw', oldYaw); initialPosition.set('pitch', oldPitch); initialPosition.set('hfov', oldHfov); itemDispatcher.unbind('end', restoreInitialPositionFunction, this); }; itemDispatcher.bind('end', restoreInitialPositionFunction, this); } panoramaSequence.set('movementIndex', panoramaSequenceIndex); } } if(player){ item.unbind('begin', onBeginFunction, this); player.unbind('stateChange', stateChangeFunction, this); for(var i = 0; i<buttons.length; ++i) { buttons[i].unbind('click', disposeCallback, this); } } if(sameViewerArea){ var currentMedia = this.getMediaFromPlayer(player); if(currentMedia == undefined || currentMedia == item.get('media')){ playListDispatcher.set('selectedIndex', indexDispatcher); } if(playList != playListDispatcher) playListDispatcher.unbind('change', changeFunction, this); } else{ viewerArea.set('visible', viewerVisibility); } playListDispatcher = undefined; }; if(!mediaDispatcher){ var currentIndex = playList.get('selectedIndex'); var currentPlayer = (currentIndex != -1) ? playList.get('items')[playList.get('selectedIndex')].get('player') : this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer) { mediaDispatcher = this.getMediaFromPlayer(currentPlayer); } } var playListDispatcher = undefined; if(mediaDispatcher){ var playListsWithMedia = this.getPlayListsWithMedia(mediaDispatcher, true); playListDispatcher = playListsWithMedia.indexOf(playList) != -1 ? playList : (playListsWithMedia.length > 0 ? playListsWithMedia[0] : undefined); } if(!playListDispatcher){ playList.set('selectedIndex', index); return; } var indexDispatcher = playListDispatcher.get('selectedIndex'); if(playList.get('selectedIndex') == index || indexDispatcher == -1){ return; } var item = playList.get('items')[index]; var itemDispatcher = playListDispatcher.get('items')[indexDispatcher]; var player = item.get('player'); var viewerArea = player.get('viewerArea'); var viewerVisibility = viewerArea.get('visible'); var sameViewerArea = viewerArea == itemDispatcher.get('player').get('viewerArea'); if(sameViewerArea){ if(playList != playListDispatcher){ playListDispatcher.set('selectedIndex', -1); playListDispatcher.bind('change', changeFunction, this); } } else{ viewerArea.set('visible', true); } var panoramaSequenceIndex = -1; var panoramaSequence = undefined; var camera = itemDispatcher.get('camera'); if(camera){ panoramaSequence = camera.get('initialSequence'); if(panoramaSequence) { panoramaSequenceIndex = panoramaSequence.get('movementIndex'); } } playList.set('selectedIndex', index); var buttons = []; var addButtons = function(property){ var value = player.get(property); if(value == undefined) return; if(Array.isArray(value)) buttons = buttons.concat(value); else buttons.push(value); }; addButtons('buttonStop'); for(var i = 0; i<buttons.length; ++i) { buttons[i].bind('click', disposeCallback, this); } item.bind('begin', onBeginFunction, self); this.executeFunctionWhenChange(playList, index, disposeCallback); },
  "changeBackgroundWhilePlay": function(playList, index, color){  var stopFunction = function(event){ playListItem.unbind('stop', stopFunction, this); if((color == viewerArea.get('backgroundColor')) && (colorRatios == viewerArea.get('backgroundColorRatios'))){ viewerArea.set('backgroundColor', backgroundColorBackup); viewerArea.set('backgroundColorRatios', backgroundColorRatiosBackup); } }; var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var viewerArea = player.get('viewerArea'); var backgroundColorBackup = viewerArea.get('backgroundColor'); var backgroundColorRatiosBackup = viewerArea.get('backgroundColorRatios'); var colorRatios = [0]; if((color != backgroundColorBackup) || (colorRatios != backgroundColorRatiosBackup)){ viewerArea.set('backgroundColor', color); viewerArea.set('backgroundColorRatios', colorRatios); playListItem.bind('stop', stopFunction, this); } },
  "isCardboardViewMode": function(){  var players = this.getByClassName('PanoramaPlayer'); return players.length > 0 && players[0].get('viewMode') == 'cardboard'; },
  "loadFromCurrentMediaPlayList": function(playList, delta){  var currentIndex = playList.get('selectedIndex'); var totalItems = playList.get('items').length; var newIndex = (currentIndex + delta) % totalItems; while(newIndex < 0){ newIndex = totalItems + newIndex; }; if(currentIndex != newIndex){ playList.set('selectedIndex', newIndex); } },
  "setOverlayBehaviour": function(overlay, media, action, preventDoubleClick){  var executeFunc = function() { switch(action){ case 'triggerClick': this.triggerOverlay(overlay, 'click'); break; case 'stop': case 'play': case 'pause': overlay[action](); break; case 'togglePlayPause': case 'togglePlayStop': if(overlay.get('state') == 'playing') overlay[action == 'togglePlayPause' ? 'pause' : 'stop'](); else overlay.play(); break; } if(preventDoubleClick){ if(window.overlaysDispatched == undefined) window.overlaysDispatched = {}; var id = overlay.get('id'); window.overlaysDispatched[id] = true; setTimeout(function(){ delete window.overlaysDispatched[id]; }, 1000); } }; if(preventDoubleClick && window.overlaysDispatched != undefined && overlay.get('id') in window.overlaysDispatched) return; var playList = this.getFirstPlayListWithMedia(media, true); if(playList != undefined){ var item = this.getPlayListItemByMedia(playList, media); if(playList.get('items').indexOf(item) != playList.get('selectedIndex')){ var beginFunc = function(e){ item.unbind('begin', beginFunc, this); executeFunc.call(this); }; item.bind('begin', beginFunc, this); return; } } executeFunc.call(this); },
  "getPanoramaOverlayByName": function(panorama, name){  var overlays = this.getOverlays(panorama); for(var i = 0, count = overlays.length; i<count; ++i){ var overlay = overlays[i]; var data = overlay.get('data'); if(data != undefined && data.label == name){ return overlay; } } return undefined; },
  "getActivePlayerWithViewer": function(viewerArea){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); players = players.concat(this.getByClassName('MapPlayer')); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('viewerArea') == viewerArea) { var playerClass = player.get('class'); if(playerClass == 'PanoramaPlayer' && (player.get('panorama') != undefined || player.get('video') != undefined)) return player; else if((playerClass == 'VideoPlayer' || playerClass == 'Video360Player') && player.get('video') != undefined) return player; else if(playerClass == 'PhotoAlbumPlayer' && player.get('photoAlbum') != undefined) return player; else if(playerClass == 'MapPlayer' && player.get('map') != undefined) return player; } } return undefined; },
  "setMainMediaByName": function(name){  var items = this.mainPlayList.get('items'); for(var i = 0; i<items.length; ++i){ var item = items[i]; if(item.get('media').get('label') == name) { this.mainPlayList.set('selectedIndex', i); return item; } } },
  "getCurrentPlayers": function(){  var players = this.getByClassName('PanoramaPlayer'); players = players.concat(this.getByClassName('VideoPlayer')); players = players.concat(this.getByClassName('Video360Player')); players = players.concat(this.getByClassName('PhotoAlbumPlayer')); return players; },
  "triggerOverlay": function(overlay, eventName){  if(overlay.get('areas') != undefined) { var areas = overlay.get('areas'); for(var i = 0; i<areas.length; ++i) { areas[i].trigger(eventName); } } else { overlay.trigger(eventName); } },
  "pauseGlobalAudios": function(caller, exclude){  if (window.pauseGlobalAudiosState == undefined) window.pauseGlobalAudiosState = {}; if (window.pauseGlobalAudiosList == undefined) window.pauseGlobalAudiosList = []; if (caller in window.pauseGlobalAudiosState) { return; } var audios = this.getByClassName('Audio').concat(this.getByClassName('VideoPanoramaOverlay')); if (window.currentGlobalAudios != undefined) audios = audios.concat(Object.values(window.currentGlobalAudios)); var audiosPaused = []; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = 0; j<objAudios.length; ++j) { var a = objAudios[j]; if(audiosPaused.indexOf(a) == -1) audiosPaused.push(a); } } window.pauseGlobalAudiosState[caller] = audiosPaused; for (var i = 0, count = audios.length; i < count; ++i) { var a = audios[i]; if (a.get('state') == 'playing' && (exclude == undefined || exclude.indexOf(a) == -1)) { a.pause(); audiosPaused.push(a); } } },
  "showPopupImage": function(image, toggleImage, customWidth, customHeight, showEffect, hideEffect, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedCallback, hideCallback){  var self = this; var closed = false; var playerClickFunction = function() { zoomImage.unbind('loaded', loadedFunction, self); hideFunction(); }; var clearAutoClose = function(){ zoomImage.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var resizeFunction = function(){ setTimeout(setCloseButtonPosition, 0); }; var loadedFunction = function(){ self.unbind('click', playerClickFunction, self); veil.set('visible', true); setCloseButtonPosition(); closeButton.set('visible', true); zoomImage.unbind('loaded', loadedFunction, this); zoomImage.bind('userInteractionStart', userInteractionStartFunction, this); zoomImage.bind('userInteractionEnd', userInteractionEndFunction, this); zoomImage.bind('resize', resizeFunction, this); timeoutID = setTimeout(timeoutFunction, 200); }; var timeoutFunction = function(){ timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ hideFunction(); }; zoomImage.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } zoomImage.bind('backgroundClick', hideFunction, this); if(toggleImage) { zoomImage.bind('click', toggleFunction, this); zoomImage.set('imageCursor', 'hand'); } closeButton.bind('click', hideFunction, this); if(loadedCallback) loadedCallback(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); closed = true; if(timeoutID) clearTimeout(timeoutID); if (timeoutUserInteractionID) clearTimeout(timeoutUserInteractionID); if(autoCloseMilliSeconds) clearAutoClose(); if(hideCallback) hideCallback(); zoomImage.set('visible', false); if(hideEffect && hideEffect.get('duration') > 0){ hideEffect.bind('end', endEffectFunction, this); } else{ zoomImage.set('image', null); } closeButton.set('visible', false); veil.set('visible', false); self.unbind('click', playerClickFunction, self); zoomImage.unbind('backgroundClick', hideFunction, this); zoomImage.unbind('userInteractionStart', userInteractionStartFunction, this); zoomImage.unbind('userInteractionEnd', userInteractionEndFunction, this, true); zoomImage.unbind('resize', resizeFunction, this); if(toggleImage) { zoomImage.unbind('click', toggleFunction, this); zoomImage.set('cursor', 'default'); } closeButton.unbind('click', hideFunction, this); self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } }; var endEffectFunction = function() { zoomImage.set('image', null); hideEffect.unbind('end', endEffectFunction, this); }; var toggleFunction = function() { zoomImage.set('image', isToggleVisible() ? image : toggleImage); }; var isToggleVisible = function() { return zoomImage.get('image') == toggleImage; }; var setCloseButtonPosition = function() { var right = zoomImage.get('actualWidth') - zoomImage.get('imageLeft') - zoomImage.get('imageWidth') + 10; var top = zoomImage.get('imageTop') + 10; if(right < 10) right = 10; if(top < 10) top = 10; closeButton.set('right', right); closeButton.set('top', top); }; var userInteractionStartFunction = function() { if(timeoutUserInteractionID){ clearTimeout(timeoutUserInteractionID); timeoutUserInteractionID = undefined; } else{ closeButton.set('visible', false); } }; var userInteractionEndFunction = function() { if(!closed){ timeoutUserInteractionID = setTimeout(userInteractionTimeoutFunction, 300); } }; var userInteractionTimeoutFunction = function() { timeoutUserInteractionID = undefined; closeButton.set('visible', true); setCloseButtonPosition(); }; this.MainViewer.set('toolTipEnabled', false); var veil = this.veilPopupPanorama; var zoomImage = this.zoomImagePopupPanorama; var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } var timeoutID = undefined; var timeoutUserInteractionID = undefined; zoomImage.bind('loaded', loadedFunction, this); setTimeout(function(){ self.bind('click', playerClickFunction, self, false); }, 0); zoomImage.set('image', image); zoomImage.set('customWidth', customWidth); zoomImage.set('customHeight', customHeight); zoomImage.set('showEffect', showEffect); zoomImage.set('hideEffect', hideEffect); zoomImage.set('visible', true); return zoomImage; },
  "executeFunctionWhenChange": function(playList, index, endFunction, changeFunction){  var endObject = undefined; var changePlayListFunction = function(event){ if(event.data.previousSelectedIndex == index){ if(changeFunction) changeFunction.call(this); if(endFunction && endObject) endObject.unbind('end', endFunction, this); playList.unbind('change', changePlayListFunction, this); } }; if(endFunction){ var playListItem = playList.get('items')[index]; if(playListItem.get('class') == 'PanoramaPlayListItem'){ var camera = playListItem.get('camera'); if(camera != undefined) endObject = camera.get('initialSequence'); if(endObject == undefined) endObject = camera.get('idleSequence'); } else{ endObject = playListItem.get('media'); } if(endObject){ endObject.bind('end', endFunction, this); } } playList.bind('change', changePlayListFunction, this); },
  "unregisterKey": function(key){  delete window[key]; },
  "getKey": function(key){  return window[key]; },
  "visibleComponentsIfPlayerFlagEnabled": function(components, playerFlag){  var enabled = this.get(playerFlag); for(var i in components){ components[i].set('visible', enabled); } },
  "setCameraSameSpotAsMedia": function(camera, media){  var player = this.getCurrentPlayerWithMedia(media); if(player != undefined) { var position = camera.get('initialPosition'); position.set('yaw', player.get('yaw')); position.set('pitch', player.get('pitch')); position.set('hfov', player.get('hfov')); } },
  "keepCompVisible": function(component, keep){  var key = 'keepVisibility_' + component.get('id'); var value = this.getKey(key); if(value == undefined && keep) { this.registerKey(key, keep); } else if(value != undefined && !keep) { this.unregisterKey(key); } },
  "pauseGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; } if(audio.get('state') == 'playing') audio.pause(); },
  "playAudioList": function(audios){  if(audios.length == 0) return; var currentAudioCount = -1; var currentAudio; var playGlobalAudioFunction = this.playGlobalAudio; var playNext = function(){ if(++currentAudioCount >= audios.length) currentAudioCount = 0; currentAudio = audios[currentAudioCount]; playGlobalAudioFunction(currentAudio, playNext); }; playNext(); },
  "getOverlays": function(media){  switch(media.get('class')){ case 'Panorama': var overlays = media.get('overlays').concat() || []; var frames = media.get('frames'); for(var j = 0; j<frames.length; ++j){ overlays = overlays.concat(frames[j].get('overlays') || []); } return overlays; case 'Video360': case 'Map': return media.get('overlays') || []; default: return []; } },
  "getCurrentPlayerWithMedia": function(media){  var playerClass = undefined; var mediaPropertyName = undefined; switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'panorama'; break; case 'Video360': playerClass = 'PanoramaPlayer'; mediaPropertyName = 'video'; break; case 'PhotoAlbum': playerClass = 'PhotoAlbumPlayer'; mediaPropertyName = 'photoAlbum'; break; case 'Map': playerClass = 'MapPlayer'; mediaPropertyName = 'map'; break; case 'Video': playerClass = 'VideoPlayer'; mediaPropertyName = 'video'; break; }; if(playerClass != undefined) { var players = this.getByClassName(playerClass); for(var i = 0; i<players.length; ++i){ var player = players[i]; if(player.get(mediaPropertyName) == media) { return player; } } } else { return undefined; } },
  "setPanoramaCameraWithSpot": function(playListItem, yaw, pitch){  var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); var initialPosition = newCamera.get('initialPosition'); initialPosition.set('yaw', yaw); initialPosition.set('pitch', pitch); this.startPanoramaWithCamera(panorama, newCamera); },
  "updateVideoCues": function(playList, index){  var playListItem = playList.get('items')[index]; var video = playListItem.get('media'); if(video.get('cues').length == 0) return; var player = playListItem.get('player'); var cues = []; var changeFunction = function(){ if(playList.get('selectedIndex') != index){ video.unbind('cueChange', cueChangeFunction, this); playList.unbind('change', changeFunction, this); } }; var cueChangeFunction = function(event){ var activeCues = event.data.activeCues; for(var i = 0, count = cues.length; i<count; ++i){ var cue = cues[i]; if(activeCues.indexOf(cue) == -1 && (cue.get('startTime') > player.get('currentTime') || cue.get('endTime') < player.get('currentTime')+0.5)){ cue.trigger('end'); } } cues = activeCues; }; video.bind('cueChange', cueChangeFunction, this); playList.bind('change', changeFunction, this); },
  "existsKey": function(key){  return key in window; },
  "getGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios != undefined && audio.get('id') in audios){ audio = audios[audio.get('id')]; } return audio; },
  "getMediaFromPlayer": function(player){  switch(player.get('class')){ case 'PanoramaPlayer': return player.get('panorama') || player.get('video'); case 'VideoPlayer': case 'Video360Player': return player.get('video'); case 'PhotoAlbumPlayer': return player.get('photoAlbum'); case 'MapPlayer': return player.get('map'); } },
  "changePlayListWithSameSpot": function(playList, newIndex){  var currentIndex = playList.get('selectedIndex'); if (currentIndex >= 0 && newIndex >= 0 && currentIndex != newIndex) { var currentItem = playList.get('items')[currentIndex]; var newItem = playList.get('items')[newIndex]; var currentPlayer = currentItem.get('player'); var newPlayer = newItem.get('player'); if ((currentPlayer.get('class') == 'PanoramaPlayer' || currentPlayer.get('class') == 'Video360Player') && (newPlayer.get('class') == 'PanoramaPlayer' || newPlayer.get('class') == 'Video360Player')) { var newCamera = this.cloneCamera(newItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, currentItem.get('media')); this.startPanoramaWithCamera(newItem.get('media'), newCamera); } } },
  "setMapLocation": function(panoramaPlayListItem, mapPlayer){  var resetFunction = function(){ panoramaPlayListItem.unbind('stop', resetFunction, this); player.set('mapPlayer', null); }; panoramaPlayListItem.bind('stop', resetFunction, this); var player = panoramaPlayListItem.get('player'); player.set('mapPlayer', mapPlayer); },
  "playGlobalAudio": function(audio, endCallback){  var endFunction = function(){ audio.unbind('end', endFunction, this); this.stopGlobalAudio(audio); if(endCallback) endCallback(); }; audio = this.getGlobalAudio(audio); var audios = window.currentGlobalAudios; if(!audios){ audios = window.currentGlobalAudios = {}; } audios[audio.get('id')] = audio; if(audio.get('state') == 'playing'){ return audio; } if(!audio.get('loop')){ audio.bind('end', endFunction, this); } audio.play(); return audio; },
  "setStartTimeVideoSync": function(video, player){  this.setStartTimeVideo(video, player.get('currentTime')); },
  "getPixels": function(value){  var result = new RegExp('((\\+|\\-)?\\d+(\\.\\d*)?)(px|vw|vh|vmin|vmax)?', 'i').exec(value); if (result == undefined) { return 0; } var num = parseFloat(result[1]); var unit = result[4]; var vw = this.rootPlayer.get('actualWidth') / 100; var vh = this.rootPlayer.get('actualHeight') / 100; switch(unit) { case 'vw': return num * vw; case 'vh': return num * vh; case 'vmin': return num * Math.min(vw, vh); case 'vmax': return num * Math.max(vw, vh); default: return num; } },
  "getFirstPlayListWithMedia": function(media, onlySelected){  var playLists = this.getPlayListsWithMedia(media, onlySelected); return playLists.length > 0 ? playLists[0] : undefined; },
  "initGA": function(){  var sendFunc = function(category, event, label) { ga('send', 'event', category, event, label); }; var media = this.getByClassName('Panorama'); media = media.concat(this.getByClassName('Video360')); media = media.concat(this.getByClassName('Map')); for(var i = 0, countI = media.length; i<countI; ++i){ var m = media[i]; var mediaLabel = m.get('label'); var overlays = this.getOverlays(m); for(var j = 0, countJ = overlays.length; j<countJ; ++j){ var overlay = overlays[j]; var overlayLabel = overlay.get('data') != undefined ? mediaLabel + ' - ' + overlay.get('data')['label'] : mediaLabel; switch(overlay.get('class')) { case 'HotspotPanoramaOverlay': case 'HotspotMapOverlay': var areas = overlay.get('areas'); for (var z = 0; z<areas.length; ++z) { areas[z].bind('click', sendFunc.bind(this, 'Hotspot', 'click', overlayLabel), this); } break; case 'CeilingCapPanoramaOverlay': case 'TripodCapPanoramaOverlay': overlay.bind('click', sendFunc.bind(this, 'Cap', 'click', overlayLabel), this); break; } } } var components = this.getByClassName('Button'); components = components.concat(this.getByClassName('IconButton')); for(var i = 0, countI = components.length; i<countI; ++i){ var c = components[i]; var componentLabel = c.get('data')['name']; c.bind('click', sendFunc.bind(this, 'Skin', 'click', componentLabel), this); } var items = this.getByClassName('PlayListItem'); var media2Item = {}; for(var i = 0, countI = items.length; i<countI; ++i) { var item = items[i]; var media = item.get('media'); if(!(media.get('id') in media2Item)) { item.bind('begin', sendFunc.bind(this, 'Media', 'play', media.get('label')), this); media2Item[media.get('id')] = item; } } },
  "getPlayListsWithMedia": function(media, onlySelected){  var result = []; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(onlySelected && playList.get('selectedIndex') == -1) continue; if(this.getPlayListItemByMedia(playList, media) != undefined) result.push(playList); } return result; },
  "pauseGlobalAudiosWhilePlayItem": function(playList, index, exclude){  var self = this; var item = playList.get('items')[index]; var media = item.get('media'); var player = item.get('player'); var caller = media.get('id'); var endFunc = function(){ if(playList.get('selectedIndex') != index) { if(hasState){ player.unbind('stateChange', stateChangeFunc, self); } self.resumeGlobalAudios(caller); } }; var stateChangeFunc = function(event){ var state = event.data.state; if(state == 'stopped'){ this.resumeGlobalAudios(caller); } else if(state == 'playing'){ this.pauseGlobalAudios(caller, exclude); } }; var mediaClass = media.get('class'); var hasState = mediaClass == 'Video360' || mediaClass == 'Video'; if(hasState){ player.bind('stateChange', stateChangeFunc, this); } this.pauseGlobalAudios(caller, exclude); this.executeFunctionWhenChange(playList, index, endFunc, endFunc); },
  "stopAndGoCamera": function(camera, ms){  var sequence = camera.get('initialSequence'); sequence.pause(); var timeoutFunction = function(){ sequence.play(); }; setTimeout(timeoutFunction, ms); },
  "setEndToItemIndex": function(playList, fromIndex, toIndex){  var endFunction = function(){ if(playList.get('selectedIndex') == fromIndex) playList.set('selectedIndex', toIndex); }; this.executeFunctionWhenChange(playList, fromIndex, endFunction); },
  "getMediaByName": function(name){  var list = this.getByClassName('Media'); for(var i = 0, count = list.length; i<count; ++i){ var media = list[i]; if((media.get('class') == 'Audio' && media.get('data').label == name) || media.get('label') == name){ return media; } } return undefined; },
  "init": function(){  if(!Object.hasOwnProperty('values')) { Object.values = function(o){ return Object.keys(o).map(function(e) { return o[e]; }); }; } var history = this.get('data')['history']; var playListChangeFunc = function(e){ var playList = e.source; var index = playList.get('selectedIndex'); if(index < 0) return; var id = playList.get('id'); if(!history.hasOwnProperty(id)) history[id] = new HistoryData(playList); history[id].add(index); }; var playLists = this.getByClassName('PlayList'); for(var i = 0, count = playLists.length; i<count; ++i) { var playList = playLists[i]; playList.bind('change', playListChangeFunc, this); } },
  "cloneCamera": function(camera){  var newCamera = this.rootPlayer.createInstance(camera.get('class')); newCamera.set('id', camera.get('id') + '_copy'); newCamera.set('idleSequence', camera.get('initialSequence')); return newCamera; },
  "stopGlobalAudio": function(audio){  var audios = window.currentGlobalAudios; if(audios){ audio = audios[audio.get('id')]; if(audio){ delete audios[audio.get('id')]; if(Object.keys(audios).length == 0){ window.currentGlobalAudios = undefined; } } } if(audio) audio.stop(); },
  "registerKey": function(key, value){  window[key] = value; },
  "getPlayListItems": function(media, player){  var itemClass = (function() { switch(media.get('class')) { case 'Panorama': case 'LivePanorama': case 'HDRPanorama': return 'PanoramaPlayListItem'; case 'Video360': return 'Video360PlayListItem'; case 'PhotoAlbum': return 'PhotoAlbumPlayListItem'; case 'Map': return 'MapPlayListItem'; case 'Video': return 'VideoPlayListItem'; } })(); if (itemClass != undefined) { var items = this.getByClassName(itemClass); for (var i = items.length-1; i>=0; --i) { var item = items[i]; if(item.get('media') != media || (player != undefined && item.get('player') != player)) { items.splice(i, 1); } } return items; } else { return []; } },
  "pauseCurrentPlayers": function(onlyPauseCameraIfPanorama){  var players = this.getCurrentPlayers(); var i = players.length; while(i-- > 0){ var player = players[i]; if(player.get('state') == 'playing') { if(onlyPauseCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.pauseCamera(); } else { player.pause(); } } else { players.splice(i, 1); } } return players; },
  "loopAlbum": function(playList, index){  var playListItem = playList.get('items')[index]; var player = playListItem.get('player'); var loopFunction = function(){ player.play(); }; this.executeFunctionWhenChange(playList, index, loopFunction); },
  "showPopupPanoramaVideoOverlay": function(popupPanoramaOverlay, closeButtonProperties, stopAudios){  var self = this; var showEndFunction = function() { popupPanoramaOverlay.unbind('showEnd', showEndFunction); closeButton.bind('click', hideFunction, this); setCloseButtonPosition(); closeButton.set('visible', true); }; var endFunction = function() { if(!popupPanoramaOverlay.get('loop')) hideFunction(); }; var hideFunction = function() { self.MainViewer.set('toolTipEnabled', true); popupPanoramaOverlay.set('visible', false); closeButton.set('visible', false); closeButton.unbind('click', hideFunction, self); popupPanoramaOverlay.unbind('end', endFunction, self); popupPanoramaOverlay.unbind('hideEnd', hideFunction, self, true); self.resumePlayers(playersPaused, true); if(stopAudios) { self.resumeGlobalAudios(); } }; var setCloseButtonPosition = function() { var right = 10; var top = 10; closeButton.set('right', right); closeButton.set('top', top); }; this.MainViewer.set('toolTipEnabled', false); var closeButton = this.closeButtonPopupPanorama; if(closeButtonProperties){ for(var key in closeButtonProperties){ closeButton.set(key, closeButtonProperties[key]); } } var playersPaused = this.pauseCurrentPlayers(true); if(stopAudios) { this.pauseGlobalAudios(); } popupPanoramaOverlay.bind('end', endFunction, this, true); popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); popupPanoramaOverlay.bind('hideEnd', hideFunction, this, true); popupPanoramaOverlay.set('visible', true); },
  "showPopupPanoramaOverlay": function(popupPanoramaOverlay, closeButtonProperties, imageHD, toggleImage, toggleImageHD, autoCloseMilliSeconds, audio, stopBackgroundAudio){  var self = this; this.MainViewer.set('toolTipEnabled', false); var cardboardEnabled = this.isCardboardViewMode(); if(!cardboardEnabled) { var zoomImage = this.zoomImagePopupPanorama; var showDuration = popupPanoramaOverlay.get('showDuration'); var hideDuration = popupPanoramaOverlay.get('hideDuration'); var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); var popupMaxWidthBackup = popupPanoramaOverlay.get('popupMaxWidth'); var popupMaxHeightBackup = popupPanoramaOverlay.get('popupMaxHeight'); var showEndFunction = function() { var loadedFunction = function(){ if(!self.isCardboardViewMode()) popupPanoramaOverlay.set('visible', false); }; popupPanoramaOverlay.unbind('showEnd', showEndFunction, self); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', 1); self.showPopupImage(imageHD, toggleImageHD, popupPanoramaOverlay.get('popupMaxWidth'), popupPanoramaOverlay.get('popupMaxHeight'), null, null, closeButtonProperties, autoCloseMilliSeconds, audio, stopBackgroundAudio, loadedFunction, hideFunction); }; var hideFunction = function() { var restoreShowDurationFunction = function(){ popupPanoramaOverlay.unbind('showEnd', restoreShowDurationFunction, self); popupPanoramaOverlay.set('visible', false); popupPanoramaOverlay.set('showDuration', showDuration); popupPanoramaOverlay.set('popupMaxWidth', popupMaxWidthBackup); popupPanoramaOverlay.set('popupMaxHeight', popupMaxHeightBackup); }; self.resumePlayers(playersPaused, audio == null || !stopBackgroundAudio); var currentWidth = zoomImage.get('imageWidth'); var currentHeight = zoomImage.get('imageHeight'); popupPanoramaOverlay.bind('showEnd', restoreShowDurationFunction, self, true); popupPanoramaOverlay.set('showDuration', 1); popupPanoramaOverlay.set('hideDuration', hideDuration); popupPanoramaOverlay.set('popupMaxWidth', currentWidth); popupPanoramaOverlay.set('popupMaxHeight', currentHeight); if(popupPanoramaOverlay.get('visible')) restoreShowDurationFunction(); else popupPanoramaOverlay.set('visible', true); self.MainViewer.set('toolTipEnabled', true); }; if(!imageHD){ imageHD = popupPanoramaOverlay.get('image'); } if(!toggleImageHD && toggleImage){ toggleImageHD = toggleImage; } popupPanoramaOverlay.bind('showEnd', showEndFunction, this, true); } else { var hideEndFunction = function() { self.resumePlayers(playersPaused, audio == null || stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ self.resumeGlobalAudios(); } self.stopGlobalAudio(audio); } popupPanoramaOverlay.unbind('hideEnd', hideEndFunction, self); self.MainViewer.set('toolTipEnabled', true); }; var playersPaused = this.pauseCurrentPlayers(audio == null || !stopBackgroundAudio); if(audio){ if(stopBackgroundAudio){ this.pauseGlobalAudios(); } this.playGlobalAudio(audio); } popupPanoramaOverlay.bind('hideEnd', hideEndFunction, this, true); } popupPanoramaOverlay.set('visible', true); },
  "syncPlaylists": function(playLists){  var changeToMedia = function(media, playListDispatched){ for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; if(playList != playListDispatched){ var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ if(items[j].get('media') == media){ if(playList.get('selectedIndex') != j){ playList.set('selectedIndex', j); } break; } } } } }; var changeFunction = function(event){ var playListDispatched = event.source; var selectedIndex = playListDispatched.get('selectedIndex'); if(selectedIndex < 0) return; var media = playListDispatched.get('items')[selectedIndex].get('media'); changeToMedia(media, playListDispatched); }; var mapPlayerChangeFunction = function(event){ var panoramaMapLocation = event.source.get('panoramaMapLocation'); if(panoramaMapLocation){ var map = panoramaMapLocation.get('map'); changeToMedia(map); } }; for(var i = 0, count = playLists.length; i<count; ++i){ playLists[i].bind('change', changeFunction, this); } var mapPlayers = this.getByClassName('MapPlayer'); for(var i = 0, count = mapPlayers.length; i<count; ++i){ mapPlayers[i].bind('panoramaMapLocation_change', mapPlayerChangeFunction, this); } },
  "autotriggerAtStart": function(playList, callback, once){  var onChange = function(event){ callback(); if(once == true) playList.unbind('change', onChange, this); }; playList.bind('change', onChange, this); },
  "getPlayListItemByMedia": function(playList, media){  var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media) return item; } return undefined; },
  "showPopupMedia": function(w, media, playList, popupMaxWidth, popupMaxHeight, autoCloseWhenFinished, stopAudios){  var self = this; var closeFunction = function(){ playList.set('selectedIndex', -1); self.MainViewer.set('toolTipEnabled', true); if(stopAudios) { self.resumeGlobalAudios(); } this.resumePlayers(playersPaused, !stopAudios); if(isVideo) { this.unbind('resize', resizeFunction, this); } w.unbind('close', closeFunction, this); }; var endFunction = function(){ w.hide(); }; var resizeFunction = function(){ var getWinValue = function(property){ return w.get(property) || 0; }; var parentWidth = self.get('actualWidth'); var parentHeight = self.get('actualHeight'); var mediaWidth = self.getMediaWidth(media); var mediaHeight = self.getMediaHeight(media); var popupMaxWidthNumber = parseFloat(popupMaxWidth) / 100; var popupMaxHeightNumber = parseFloat(popupMaxHeight) / 100; var windowWidth = popupMaxWidthNumber * parentWidth; var windowHeight = popupMaxHeightNumber * parentHeight; var footerHeight = getWinValue('footerHeight'); var headerHeight = getWinValue('headerHeight'); if(!headerHeight) { var closeButtonHeight = getWinValue('closeButtonIconHeight') + getWinValue('closeButtonPaddingTop') + getWinValue('closeButtonPaddingBottom'); var titleHeight = self.getPixels(getWinValue('titleFontSize')) + getWinValue('titlePaddingTop') + getWinValue('titlePaddingBottom'); headerHeight = closeButtonHeight > titleHeight ? closeButtonHeight : titleHeight; headerHeight += getWinValue('headerPaddingTop') + getWinValue('headerPaddingBottom'); } var contentWindowWidth = windowWidth - getWinValue('bodyPaddingLeft') - getWinValue('bodyPaddingRight') - getWinValue('paddingLeft') - getWinValue('paddingRight'); var contentWindowHeight = windowHeight - headerHeight - footerHeight - getWinValue('bodyPaddingTop') - getWinValue('bodyPaddingBottom') - getWinValue('paddingTop') - getWinValue('paddingBottom'); var parentAspectRatio = contentWindowWidth / contentWindowHeight; var mediaAspectRatio = mediaWidth / mediaHeight; if(parentAspectRatio > mediaAspectRatio) { windowWidth = contentWindowHeight * mediaAspectRatio + getWinValue('bodyPaddingLeft') + getWinValue('bodyPaddingRight') + getWinValue('paddingLeft') + getWinValue('paddingRight'); } else { windowHeight = contentWindowWidth / mediaAspectRatio + headerHeight + footerHeight + getWinValue('bodyPaddingTop') + getWinValue('bodyPaddingBottom') + getWinValue('paddingTop') + getWinValue('paddingBottom'); } if(windowWidth > parentWidth * popupMaxWidthNumber) { windowWidth = parentWidth * popupMaxWidthNumber; } if(windowHeight > parentHeight * popupMaxHeightNumber) { windowHeight = parentHeight * popupMaxHeightNumber; } w.set('width', windowWidth); w.set('height', windowHeight); w.set('x', (parentWidth - getWinValue('actualWidth')) * 0.5); w.set('y', (parentHeight - getWinValue('actualHeight')) * 0.5); }; if(autoCloseWhenFinished){ this.executeFunctionWhenChange(playList, 0, endFunction); } var mediaClass = media.get('class'); var isVideo = mediaClass == 'Video' || mediaClass == 'Video360'; playList.set('selectedIndex', 0); if(isVideo){ this.bind('resize', resizeFunction, this); resizeFunction(); playList.get('items')[0].get('player').play(); } else { w.set('width', popupMaxWidth); w.set('height', popupMaxHeight); } this.MainViewer.set('toolTipEnabled', false); if(stopAudios) { this.pauseGlobalAudios(); } var playersPaused = this.pauseCurrentPlayers(!stopAudios); w.bind('close', closeFunction, this); w.show(this, true); },
  "setPanoramaCameraWithCurrentSpot": function(playListItem){  var currentPlayer = this.getActivePlayerWithViewer(this.MainViewer); if(currentPlayer == undefined){ return; } var playerClass = currentPlayer.get('class'); if(playerClass != 'PanoramaPlayer' && playerClass != 'Video360Player'){ return; } var fromMedia = currentPlayer.get('panorama'); if(fromMedia == undefined) { fromMedia = currentPlayer.get('video'); } var panorama = playListItem.get('media'); var newCamera = this.cloneCamera(playListItem.get('camera')); this.setCameraSameSpotAsMedia(newCamera, fromMedia); this.startPanoramaWithCamera(panorama, newCamera); },
  "showComponentsWhileMouseOver": function(parentComponent, components, durationVisibleWhileOut){  var setVisibility = function(visible){ for(var i = 0, length = components.length; i<length; i++){ var component = components[i]; if(component.get('class') == 'HTMLText' && (component.get('html') == '' || component.get('html') == undefined)) { continue; } component.set('visible', visible); } }; if (this.rootPlayer.get('touchDevice') == true){ setVisibility(true); } else { var timeoutID = -1; var rollOverFunction = function(){ setVisibility(true); if(timeoutID >= 0) clearTimeout(timeoutID); parentComponent.unbind('rollOver', rollOverFunction, this); parentComponent.bind('rollOut', rollOutFunction, this); }; var rollOutFunction = function(){ var timeoutFunction = function(){ setVisibility(false); parentComponent.unbind('rollOver', rollOverFunction, this); }; parentComponent.unbind('rollOut', rollOutFunction, this); parentComponent.bind('rollOver', rollOverFunction, this); timeoutID = setTimeout(timeoutFunction, durationVisibleWhileOut); }; parentComponent.bind('rollOver', rollOverFunction, this); } },
  "setComponentVisibility": function(component, visible, applyAt, effect, propertyEffect, ignoreClearTimeout){  var keepVisibility = this.getKey('keepVisibility_' + component.get('id')); if(keepVisibility) return; this.unregisterKey('visibility_'+component.get('id')); var changeVisibility = function(){ if(effect && propertyEffect){ component.set(propertyEffect, effect); } component.set('visible', visible); if(component.get('class') == 'ViewerArea'){ try{ if(visible) component.restart(); else if(component.get('playbackState') == 'playing') component.pause(); } catch(e){}; } }; var effectTimeoutName = 'effectTimeout_'+component.get('id'); if(!ignoreClearTimeout && window.hasOwnProperty(effectTimeoutName)){ var effectTimeout = window[effectTimeoutName]; if(effectTimeout instanceof Array){ for(var i=0; i<effectTimeout.length; i++){ clearTimeout(effectTimeout[i]) } }else{ clearTimeout(effectTimeout); } delete window[effectTimeoutName]; } else if(visible == component.get('visible') && !ignoreClearTimeout) return; if(applyAt && applyAt > 0){ var effectTimeout = setTimeout(function(){ if(window[effectTimeoutName] instanceof Array) { var arrayTimeoutVal = window[effectTimeoutName]; var index = arrayTimeoutVal.indexOf(effectTimeout); arrayTimeoutVal.splice(index, 1); if(arrayTimeoutVal.length == 0){ delete window[effectTimeoutName]; } }else{ delete window[effectTimeoutName]; } changeVisibility(); }, applyAt); if(window.hasOwnProperty(effectTimeoutName)){ window[effectTimeoutName] = [window[effectTimeoutName], effectTimeout]; }else{ window[effectTimeoutName] = effectTimeout; } } else{ changeVisibility(); } },
  "shareWhatsapp": function(url){  window.open('https://api.whatsapp.com/send/?text=' + encodeURIComponent(url), '_blank'); },
  "historyGoForward": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.forward(); } },
  "shareFacebook": function(url){  window.open('https://www.facebook.com/sharer/sharer.php?u=' + url, '_blank'); },
  "resumeGlobalAudios": function(caller){  if (window.pauseGlobalAudiosState == undefined || !(caller in window.pauseGlobalAudiosState)) return; var audiosPaused = window.pauseGlobalAudiosState[caller]; delete window.pauseGlobalAudiosState[caller]; var values = Object.values(window.pauseGlobalAudiosState); for (var i = 0, count = values.length; i<count; ++i) { var objAudios = values[i]; for (var j = audiosPaused.length-1; j>=0; --j) { var a = audiosPaused[j]; if(objAudios.indexOf(a) != -1) audiosPaused.splice(j, 1); } } for (var i = 0, count = audiosPaused.length; i<count; ++i) { var a = audiosPaused[i]; if (a.get('state') == 'paused') a.play(); } },
  "startPanoramaWithCamera": function(media, camera){  if(window.currentPanoramasWithCameraChanged != undefined && window.currentPanoramasWithCameraChanged.indexOf(media) != -1){ return; } var playLists = this.getByClassName('PlayList'); if(playLists.length == 0) return; var restoreItems = []; for(var i = 0, count = playLists.length; i<count; ++i){ var playList = playLists[i]; var items = playList.get('items'); for(var j = 0, countJ = items.length; j<countJ; ++j){ var item = items[j]; if(item.get('media') == media && (item.get('class') == 'PanoramaPlayListItem' || item.get('class') == 'Video360PlayListItem')){ restoreItems.push({camera: item.get('camera'), item: item}); item.set('camera', camera); } } } if(restoreItems.length > 0) { if(window.currentPanoramasWithCameraChanged == undefined) { window.currentPanoramasWithCameraChanged = [media]; } else { window.currentPanoramasWithCameraChanged.push(media); } var restoreCameraOnStop = function(){ var index = window.currentPanoramasWithCameraChanged.indexOf(media); if(index != -1) { window.currentPanoramasWithCameraChanged.splice(index, 1); } for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.set('camera', restoreItems[i].camera); restoreItems[i].item.unbind('stop', restoreCameraOnStop, this); } }; for (var i = 0; i < restoreItems.length; i++) { restoreItems[i].item.bind('stop', restoreCameraOnStop, this); } } },
  "historyGoBack": function(playList){  var history = this.get('data')['history'][playList.get('id')]; if(history != undefined) { history.back(); } },
  "keepCompVisibleWhileInitItem": function(playList, index, component, keep){  var item = playList.get('items')[index]; var stopFunc = function() { item.unbind('stop', stopFunc, this, true); item.unbind('stop', stopFunc, this); item.unbind('begin', stopFunc, this, true); item.unbind('begin', stopFunc, this); this.keepCompVisible(component, !keep); }; this.keepCompVisible(component, keep); item.bind('stop', stopFunc, this, true); item.bind('stop', stopFunc, this); item.bind('begin', stopFunc, this, true); item.bind('begin', stopFunc, this); },
  "getMediaHeight": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxH=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('height') > maxH) maxH = r.get('height'); } return maxH; }else{ return r.get('height') } default: return media.get('height'); } },
  "getMediaWidth": function(media){  switch(media.get('class')){ case 'Video360': var res = media.get('video'); if(res instanceof Array){ var maxW=0; for(var i=0; i<res.length; i++){ var r = res[i]; if(r.get('width') > maxW) maxW = r.get('width'); } return maxW; }else{ return r.get('width') } default: return media.get('width'); } },
  "getComponentByName": function(name){  var list = this.getByClassName('UIComponent'); for(var i = 0, count = list.length; i<count; ++i){ var component = list[i]; var data = component.get('data'); if(data != undefined && data.name == name){ return component; } } return undefined; },
  "resumePlayers": function(players, onlyResumeCameraIfPanorama){  for(var i = 0; i<players.length; ++i){ var player = players[i]; if(onlyResumeCameraIfPanorama && player.get('class') == 'PanoramaPlayer' && typeof player.get('video') === 'undefined'){ player.resumeCamera(); } else{ player.play(); } } },
  "shareTwitter": function(url){  window.open('https://twitter.com/intent/tweet?source=webclient&url=' + url, '_blank'); },
  "playGlobalAudioWhilePlay": function(playList, index, audio, endCallback, stopBackgroundAudio){  var changeFunction = function(event){ if(event.data.previousSelectedIndex == index){ this.stopGlobalAudio(audio); if(isPanorama) { var media = playListItem.get('media'); var audios = media.get('audios'); audios.splice(audios.indexOf(audio), 1); media.set('audios', audios); } playList.unbind('change', changeFunction, this); if(endCallback) endCallback(); } }; var audios = window.currentGlobalAudios; if(audios && audio.get('id') in audios){ audio = audios[audio.get('id')]; if(audio.get('state') != 'playing'){ audio.play(); } return audio; } playList.bind('change', changeFunction, this); var playListItem = playList.get('items')[index]; var isPanorama = playListItem.get('class') == 'PanoramaPlayListItem'; if(isPanorama) { var media = playListItem.get('media'); var audios = (media.get('audios') || []).slice(); if(audio.get('class') == 'MediaAudio') { var panoramaAudio = this.rootPlayer.createInstance('PanoramaAudio'); panoramaAudio.set('autoplay', false); panoramaAudio.set('audio', audio.get('audio')); panoramaAudio.set('loop', audio.get('loop')); panoramaAudio.set('id', audio.get('id')); var stateChangeFunctions = audio.getBindings('stateChange'); for(var i = 0; i<stateChangeFunctions.length; ++i){ var f = stateChangeFunctions[i]; if(typeof f == 'string') f = new Function('event', f); panoramaAudio.bind('stateChange', f, this); } audio = panoramaAudio; } audios.push(audio); media.set('audios', audios); } var src = this.playGlobalAudio(audio, endCallback); if(stopBackgroundAudio === true){ var stateChangeFunc = function(){ if(src.get('state') == 'playing'){ this.pauseGlobalAudios(src.get('id'), [src]); } else if(src.get('state') == 'stopped'){ this.resumeGlobalAudios(src.get('id')); src.unbind('stateChange', stateChangeFunc, this); } }; src.bind('stateChange', stateChangeFunc, this); } return src; },
  "setStartTimeVideo": function(video, time){  var items = this.getPlayListItems(video); var startTimeBackup = []; var restoreStartTimeFunc = function() { for(var i = 0; i<items.length; ++i){ var item = items[i]; item.set('startTime', startTimeBackup[i]); item.unbind('stop', restoreStartTimeFunc, this); } }; for(var i = 0; i<items.length; ++i) { var item = items[i]; var player = item.get('player'); if(player.get('video') == video && player.get('state') == 'playing') { player.seek(time); } else { startTimeBackup.push(item.get('startTime')); item.set('startTime', time); item.bind('stop', restoreStartTimeFunc, this); } } },
  "showWindow": function(w, autoCloseMilliSeconds, containsAudio){  if(w.get('visible') == true){ return; } var closeFunction = function(){ clearAutoClose(); this.resumePlayers(playersPaused, !containsAudio); w.unbind('close', closeFunction, this); }; var clearAutoClose = function(){ w.unbind('click', clearAutoClose, this); if(timeoutID != undefined){ clearTimeout(timeoutID); } }; var timeoutID = undefined; if(autoCloseMilliSeconds){ var autoCloseFunction = function(){ w.hide(); }; w.bind('click', clearAutoClose, this); timeoutID = setTimeout(autoCloseFunction, autoCloseMilliSeconds); } var playersPaused = this.pauseCurrentPlayers(!containsAudio); w.bind('close', closeFunction, this); w.show(this, true); },
  "openLink": function(url, name){  if(url == location.href) { return; } var isElectron = (window && window.process && window.process.versions && window.process.versions['electron']) || (navigator && navigator.userAgent && navigator.userAgent.indexOf('Electron') >= 0); if (name == '_blank' && isElectron) { if (url.startsWith('/')) { var r = window.location.href.split('/'); r.pop(); url = r.join('/') + url; } var extension = url.split('.').pop().toLowerCase(); if(extension != 'pdf' || url.startsWith('file://')) { var shell = window.require('electron').shell; shell.openExternal(url); } else { window.open(url, name); } } else if(isElectron && (name == '_top' || name == '_self')) { window.location = url; } else { var newWindow = window.open(url, name); newWindow.focus(); } }
 },
 "borderSize": 0,
 "backgroundPreloadEnabled": true,
 "minWidth": 20,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "gap": 10,
 "height": "100%",
 "propagateClick": true,
 "desktopMipmappingEnabled": false,
 "width": "100%",
 "definitions": [{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E34366C1_E999_423A_41C4_475243D37D03_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "3",
 "id": "panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89",
 "hfov": 360,
 "partial": false,
 "pitch": 0,
 "overlays": [
  "this.overlay_FF2B27FA_EA69_41CE_41E3_452A8ED33922"
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_E3797C67_E99F_46C6_41D6_512859B91057",
   "class": "AdjacentPanorama",
   "yaw": 142.53,
   "backwardYaw": 104.89,
   "distance": 1
  }
 ],
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_t.jpg"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "16",
 "id": "panorama_E34366C1_E999_423A_41C4_475243D37D03",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E34366C1_E999_423A_41C4_475243D37D03_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "17",
 "id": "panorama_E343B942_E999_CE3E_41E2_4F462F044962",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E343B942_E999_CE3E_41E2_4F462F044962_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "24",
 "id": "panorama_E3429F06_E998_C246_41E5_F4BA611045B1",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E3429F06_E998_C246_41E5_F4BA611045B1_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "2",
 "id": "panorama_E3797C67_E99F_46C6_41D6_512859B91057",
 "hfov": 360,
 "partial": false,
 "pitch": 0,
 "overlays": [
  "this.overlay_FA7BDB2B_E998_C24F_41E1_8B52BBF3B179",
  "this.overlay_FC9A5418_E999_C64A_41B8_D8C38E6E38C9",
  "this.overlay_FCA35E2A_E99B_424E_41D9_1DC0FCB616A3",
  "this.overlay_FD790408_E999_C64A_41D0_437A03F918D7",
  "this.overlay_FD379C66_E998_C6C6_41D3_591AC724A64C",
  "this.overlay_FF326159_EA68_DECA_41E5_A84A935B6C22"
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_E3457768_E99F_C2CA_41EC_601674B14614",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89",
   "class": "AdjacentPanorama",
   "yaw": 104.89,
   "backwardYaw": 142.53,
   "distance": 1
  }
 ],
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_t.jpg"
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "12",
 "id": "panorama_E3432BD1_E998_C1DA_41CC_55225B747831",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E3432BD1_E998_C1DA_41CC_55225B747831_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E3797C67_E99F_46C6_41D6_512859B91057_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "10",
 "id": "panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "9",
 "id": "panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "14",
 "id": "panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "11",
 "id": "panorama_E342F803_E998_CE3E_41E5_003AD32AEE52",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E343B942_E999_CE3E_41E2_4F462F044962_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E3436AD6_E999_43D9_41E3_728719BB033F_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "20",
 "id": "panorama_E3438319_E999_424A_41C4_F543BA9CE69E",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E3438319_E999_424A_41C4_F543BA9CE69E_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "7",
 "id": "panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_783298C3_6F37_4D66_41DB_5F69C78902F4",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -75.11,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "6",
 "id": "panorama_E3457768_E99F_C2CA_41EC_601674B14614",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E3457768_E99F_C2CA_41EC_601674B14614_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E3457768_E99F_C2CA_41EC_601674B14614_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "5",
 "id": "panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58",
 "hfov": 360,
 "partial": false,
 "pitch": 0,
 "overlays": [
  "this.overlay_FFC0EE5A_EA68_C2C9_41E0_E59D59B4C983"
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B",
   "class": "AdjacentPanorama",
   "yaw": -95.29,
   "backwardYaw": 3.07,
   "distance": 1
  }
 ],
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_t.jpg"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_78162877_6F37_4D2E_41C1_FDDC06DDB708",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 84.71,
  "pitch": 0
 }
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "23",
 "id": "panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "15",
 "id": "panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "buttonCardboardView": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "mouseControlMode": "drag_acceleration",
 "class": "PanoramaPlayer",
 "buttonToggleHotspots": "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "displayPlaybackBar": true,
 "gyroscopeVerticalDraggingEnabled": true,
 "viewerArea": "this.MainViewer",
 "id": "MainViewerPanoramaPlayer",
 "buttonToggleGyroscope": "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "touchControlMode": "drag_rotation"
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "8",
 "id": "panorama_E3453C58_E99F_46CA_41B7_A2D92220D123",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "13",
 "id": "panorama_E3432E3C_E998_C24A_41DB_723B17650171",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E3432E3C_E998_C24A_41DB_723B17650171_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "25",
 "id": "panorama_E342E211_E998_C25B_41D1_6CE01214CAEA",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "22",
 "id": "panorama_E3436AD6_E999_43D9_41E3_728719BB033F",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E3436AD6_E999_43D9_41E3_728719BB033F_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E3429F06_E998_C246_41E5_F4BA611045B1_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_79FD882B_6F37_4D26_41D8_489F3A20E0B1",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "19",
 "id": "panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E3432BD1_E998_C1DA_41CC_55225B747831_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_784288F3_6F37_4D26_4186_7FACD44D7E22",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -37.47,
  "pitch": 0
 }
},
{
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "1",
 "id": "panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63",
 "hfov": 360,
 "partial": false,
 "pitch": 0,
 "overlays": [
  "this.overlay_E4F37BD8_E999_41CA_4199_ADA35300D3EF",
  "this.overlay_E7A987C7_E9A9_C1C6_41EC_E6A518B6FD8B",
  "this.overlay_E7472FB8_E9A9_424A_41E5_ADE31129F903",
  "this.overlay_F97633F8_E9B7_41C9_41E2_AE1C059D505D",
  "this.overlay_F932542A_E9A9_464E_41D1_9C65CAC33946",
  "this.overlay_F8E0F555_E9A8_C6DA_41CF_00C764810E38",
  "this.overlay_FB5255E5_E999_41FA_41E1_F74DCBBF10DB"
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_E3797C67_E99F_46C6_41D6_512859B91057",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_E3457768_E99F_C2CA_41EC_601674B14614",
   "class": "AdjacentPanorama"
  },
  {
   "panorama": "this.panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3",
   "class": "AdjacentPanorama"
  }
 ],
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_t.jpg"
},
{
 "class": "Panorama",
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "4",
 "id": "panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B",
 "hfov": 360,
 "partial": false,
 "pitch": 0,
 "overlays": [
  "this.overlay_FFB8FAED_EA6F_43CA_41D3_EFEA7BD188FB",
  "this.overlay_FF367D0C_EA68_C64A_41B0_C3F9B46B23D4"
 ],
 "vfov": 180,
 "adjacentPanoramas": [
  {
   "panorama": "this.panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58",
   "class": "AdjacentPanorama",
   "yaw": 3.07,
   "backwardYaw": -95.29,
   "distance": 1
  },
  {
   "panorama": "this.panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58",
   "class": "AdjacentPanorama",
   "yaw": 0.61,
   "backwardYaw": -95.29,
   "distance": 1
  }
 ],
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_t.jpg"
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "21",
 "id": "panorama_E3435790_E999_425A_41D8_0E669A512275",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E3435790_E999_425A_41D8_0E669A512275_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "Panorama",
 "vfov": 180,
 "frames": [
  {
   "class": "CubicPanoramaFrame",
   "front": {
    "levels": [
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/f/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/f/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/f/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "thumbnailUrl": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_t.jpg",
   "top": {
    "levels": [
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/u/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/u/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/u/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "right": {
    "levels": [
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/r/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/r/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/r/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "back": {
    "levels": [
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/b/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/b/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/b/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "bottom": {
    "levels": [
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/d/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/d/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/d/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   },
   "left": {
    "levels": [
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/l/0/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 4,
      "width": 2048,
      "colCount": 4,
      "height": 2048,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/l/1/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 2,
      "width": 1024,
      "colCount": 2,
      "height": 1024,
      "tags": "ondemand"
     },
     {
      "url": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_0/l/2/{row}_{column}.jpg",
      "class": "TiledImageResourceLevel",
      "rowCount": 1,
      "width": 512,
      "colCount": 1,
      "height": 512,
      "tags": [
       "ondemand",
       "preload"
      ]
     }
    ],
    "class": "ImageResource"
   }
  }
 ],
 "label": "18",
 "id": "panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9",
 "hfovMax": 130,
 "thumbnailUrl": "media/panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_t.jpg",
 "hfov": 360,
 "partial": false,
 "pitch": 0
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E3432E3C_E998_C24A_41DB_723B17650171_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E3438319_E999_424A_41C4_F543BA9CE69E_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_79F1780A_6F37_4CE7_41D8_AF02A0178931",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_7822489A_6F37_4DE6_41D1_2601121700CA",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 84.71,
  "pitch": 0
 }
},
{
 "class": "PlayList",
 "id": "mainPlayList",
 "items": [
  {
   "media": "this.panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_camera"
  },
  {
   "media": "this.panorama_E3797C67_E99F_46C6_41D6_512859B91057",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3797C67_E99F_46C6_41D6_512859B91057_camera"
  },
  {
   "media": "this.panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_camera"
  },
  {
   "media": "this.panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_camera"
  },
  {
   "media": "this.panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_camera"
  },
  {
   "media": "this.panorama_E3457768_E99F_C2CA_41EC_601674B14614",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3457768_E99F_C2CA_41EC_601674B14614_camera"
  },
  {
   "media": "this.panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_camera"
  },
  {
   "media": "this.panorama_E3453C58_E99F_46CA_41B7_A2D92220D123",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_camera"
  },
  {
   "media": "this.panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_camera"
  },
  {
   "media": "this.panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_camera"
  },
  {
   "media": "this.panorama_E342F803_E998_CE3E_41E5_003AD32AEE52",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_camera"
  },
  {
   "media": "this.panorama_E3432BD1_E998_C1DA_41CC_55225B747831",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3432BD1_E998_C1DA_41CC_55225B747831_camera"
  },
  {
   "media": "this.panorama_E3432E3C_E998_C24A_41DB_723B17650171",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3432E3C_E998_C24A_41DB_723B17650171_camera"
  },
  {
   "media": "this.panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_camera"
  },
  {
   "media": "this.panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_camera"
  },
  {
   "media": "this.panorama_E34366C1_E999_423A_41C4_475243D37D03",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E34366C1_E999_423A_41C4_475243D37D03_camera"
  },
  {
   "media": "this.panorama_E343B942_E999_CE3E_41E2_4F462F044962",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E343B942_E999_CE3E_41E2_4F462F044962_camera"
  },
  {
   "media": "this.panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_camera"
  },
  {
   "media": "this.panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_camera"
  },
  {
   "media": "this.panorama_E3438319_E999_424A_41C4_F543BA9CE69E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3438319_E999_424A_41C4_F543BA9CE69E_camera"
  },
  {
   "media": "this.panorama_E3435790_E999_425A_41D8_0E669A512275",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3435790_E999_425A_41D8_0E669A512275_camera"
  },
  {
   "media": "this.panorama_E3436AD6_E999_43D9_41E3_728719BB033F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3436AD6_E999_43D9_41E3_728719BB033F_camera"
  },
  {
   "media": "this.panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_camera"
  },
  {
   "media": "this.panorama_E3429F06_E998_C246_41E5_F4BA611045B1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3429F06_E998_C246_41E5_F4BA611045B1_camera"
  },
  {
   "media": "this.panorama_E342E211_E998_C25B_41D1_6CE01214CAEA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.mainPlayList, 24, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "end": "this.trigger('tourEnded')",
   "camera": "this.panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_camera"
  }
 ]
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E3435790_E999_425A_41D8_0E669A512275_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_camera",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": 0,
  "pitch": 0
 }
},
{
 "class": "PanoramaCamera",
 "automaticZoomSpeed": 10,
 "initialSequence": {
  "class": "PanoramaCameraSequence",
  "restartMovementOnUserInteraction": false,
  "movements": [
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_in"
   },
   {
    "yawDelta": 323,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "linear"
   },
   {
    "yawDelta": 18.5,
    "class": "DistancePanoramaCameraMovement",
    "yawSpeed": 7.96,
    "easing": "cubic_out"
   }
  ]
 },
 "id": "camera_780AB84F_6F37_4D7E_41D6_06E46FD2B1FC",
 "initialPosition": {
  "class": "PanoramaCameraPosition",
  "yaw": -176.93,
  "pitch": 0
 }
},
{
 "class": "PlayList",
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "items": [
  {
   "media": "this.panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 0, 1)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_camera"
  },
  {
   "media": "this.panorama_E3797C67_E99F_46C6_41D6_512859B91057",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 1, 2)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3797C67_E99F_46C6_41D6_512859B91057_camera"
  },
  {
   "media": "this.panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 2, 3)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_camera"
  },
  {
   "media": "this.panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 3, 4)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_camera"
  },
  {
   "media": "this.panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 4, 5)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_camera"
  },
  {
   "media": "this.panorama_E3457768_E99F_C2CA_41EC_601674B14614",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 5, 6)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3457768_E99F_C2CA_41EC_601674B14614_camera"
  },
  {
   "media": "this.panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 6, 7)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3450974_E99F_4EDA_41D7_7D96D282F61B_camera"
  },
  {
   "media": "this.panorama_E3453C58_E99F_46CA_41B7_A2D92220D123",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 7, 8)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3453C58_E99F_46CA_41B7_A2D92220D123_camera"
  },
  {
   "media": "this.panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 8, 9)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3452E96_E99F_4259_41B1_C4C2689CEBEE_camera"
  },
  {
   "media": "this.panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 9, 10)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3_camera"
  },
  {
   "media": "this.panorama_E342F803_E998_CE3E_41E5_003AD32AEE52",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 10, 11)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E342F803_E998_CE3E_41E5_003AD32AEE52_camera"
  },
  {
   "media": "this.panorama_E3432BD1_E998_C1DA_41CC_55225B747831",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 11, 12)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3432BD1_E998_C1DA_41CC_55225B747831_camera"
  },
  {
   "media": "this.panorama_E3432E3C_E998_C24A_41DB_723B17650171",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 12, 13)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3432E3C_E998_C24A_41DB_723B17650171_camera"
  },
  {
   "media": "this.panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 13, 14)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E34370A0_E999_5E7A_41C2_721CE9ACB4A7_camera"
  },
  {
   "media": "this.panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 14, 15)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E34372E2_E999_43FE_41EC_4B3FC97CEF96_camera"
  },
  {
   "media": "this.panorama_E34366C1_E999_423A_41C4_475243D37D03",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 15, 16)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E34366C1_E999_423A_41C4_475243D37D03_camera"
  },
  {
   "media": "this.panorama_E343B942_E999_CE3E_41E2_4F462F044962",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 16, 17)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E343B942_E999_CE3E_41E2_4F462F044962_camera"
  },
  {
   "media": "this.panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 17, 18)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E343CCE7_E999_C7C6_41D2_4D0AC43C75D9_camera"
  },
  {
   "media": "this.panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 18, 19)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E34380E7_E999_DFC7_41E2_0424A0D0EAE5_camera"
  },
  {
   "media": "this.panorama_E3438319_E999_424A_41C4_F543BA9CE69E",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 19, 20)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3438319_E999_424A_41C4_F543BA9CE69E_camera"
  },
  {
   "media": "this.panorama_E3435790_E999_425A_41D8_0E669A512275",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 20, 21)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3435790_E999_425A_41D8_0E669A512275_camera"
  },
  {
   "media": "this.panorama_E3436AD6_E999_43D9_41E3_728719BB033F",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 21, 22)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3436AD6_E999_43D9_41E3_728719BB033F_camera"
  },
  {
   "media": "this.panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 22, 23)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3437D08_E999_464A_41EC_95BBF9F0A6D8_camera"
  },
  {
   "media": "this.panorama_E3429F06_E998_C246_41E5_F4BA611045B1",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 23, 24)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E3429F06_E998_C246_41E5_F4BA611045B1_camera"
  },
  {
   "media": "this.panorama_E342E211_E998_C25B_41D1_6CE01214CAEA",
   "class": "PanoramaPlayListItem",
   "begin": "this.setEndToItemIndex(this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist, 24, 0)",
   "player": "this.MainViewerPanoramaPlayer",
   "camera": "this.panorama_E342E211_E998_C25B_41D1_6CE01214CAEA_camera"
  }
 ]
},
{
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "id": "MainViewer",
 "left": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipFontSize": 13,
 "toolTipOpacity": 0.5,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColorDirection": "vertical",
 "width": "100%",
 "playbackBarRight": 0,
 "toolTipPaddingBottom": 7,
 "minHeight": 50,
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipShadowColor": "#333333",
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "progressBarBorderSize": 6,
 "paddingRight": 0,
 "playbackBarBorderRadius": 0,
 "height": "100%",
 "class": "ViewerArea",
 "toolTipShadowOpacity": 0,
 "playbackBarProgressBorderColor": "#000000",
 "borderSize": 0,
 "minWidth": 100,
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderRadius": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "propagateClick": true,
 "playbackBarBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipFontFamily": "Georgia",
 "toolTipTextShadowOpacity": 0,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "transitionDuration": 500,
 "progressOpacity": 1,
 "paddingLeft": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "progressBottom": 55,
 "toolTipFontColor": "#FFFFFF",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipBackgroundColor": "#000000",
 "playbackBarOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "progressBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "top": 0,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderSize": 1,
 "toolTipPaddingTop": 7,
 "progressBorderSize": 0,
 "toolTipPaddingLeft": 10,
 "toolTipPaddingRight": 10,
 "toolTipDisplayTime": 600,
 "progressBorderRadius": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarLeft": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 5,
 "data": {
  "name": "Main Viewer"
 },
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "playbackBarHeadOpacity": 1,
 "progressBarBackgroundColor": [
  "#3399FF"
 ]
},
{
 "id": "Container_EF8F8BD8_E386_8E03_41E3_4CF7CC1F4D8E",
 "scrollBarColor": "#000000",
 "width": 115.05,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "right": "0%",
 "children": [
  "this.Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
  "this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE"
 ],
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "minHeight": 1,
 "shadow": false,
 "layout": "absolute",
 "top": "0%",
 "overflow": "scroll",
 "height": 641,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "data": {
  "name": "--SETTINGS"
 },
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_0DD1BF09_1744_0507_41B3_29434E440055",
 "left": 30,
 "scrollBarColor": "#000000",
 "width": 573,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.Label_0DD14F09_1744_0507_41AA_D8475423214A",
  "this.Label_0DD1AF09_1744_0507_41B4_9F5A60B503B2"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "absolute",
 "top": 15,
 "overflow": "visible",
 "height": 133,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "data": {
  "name": "--STICKER"
 },
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48",
 "left": "0%",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "right": "0%",
 "children": [
  "this.Image_1B99DD00_16C4_0505_41B3_51F09727447A",
  "this.Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
  "this.IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270"
 ],
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": false,
 "minHeight": 1,
 "layout": "absolute",
 "bottom": 0,
 "height": 118,
 "paddingRight": 0,
 "backgroundOpacity": 0.64,
 "class": "Container",
 "overflow": "visible",
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "backgroundImageUrl": "skin/Container_1B9AAD00_16C4_0505_41B5_6F4AE0747E48.png",
 "propagateClick": true,
 "data": {
  "name": "--MENU"
 },
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "left": "0%",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "id": "Container_062AB830_1140_E215_41AF_6C9D65345420",
 "horizontalAlign": "left",
 "right": "0%",
 "children": [
  "this.Container_062A782F_1140_E20B_41AF_B3E5DE341773",
  "this.Container_062A9830_1140_E215_41A7_5F2BBE5C20E4"
 ],
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": false,
 "minHeight": 1,
 "layout": "absolute",
 "top": "0%",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "backgroundOpacity": 0.6,
 "class": "Container",
 "overflow": "scroll",
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "paddingBottom": 0,
 "propagateClick": true,
 "data": {
  "name": "--INFO photo"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "visible": false,
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "left": "0%",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "id": "Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8",
 "horizontalAlign": "left",
 "right": "0%",
 "children": [
  "this.Container_23F7B7B7_0C0A_6293_4197_F931EEC6FA48",
  "this.Container_23F097B8_0C0A_629D_4176_D87C90BA32B6"
 ],
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": false,
 "minHeight": 1,
 "layout": "absolute",
 "top": "0%",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "backgroundOpacity": 0.6,
 "class": "Container",
 "overflow": "scroll",
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8, false, 0, null, null, false)",
 "paddingBottom": 0,
 "propagateClick": true,
 "data": {
  "name": "--INFO photoalbum"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "visible": false,
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "left": "0%",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "id": "Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15",
 "horizontalAlign": "left",
 "right": "0%",
 "children": [
  "this.Container_39A197B1_0C06_62AF_419A_D15E4DDD2528"
 ],
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": false,
 "minHeight": 1,
 "layout": "absolute",
 "top": "0%",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "backgroundOpacity": 0.6,
 "class": "Container",
 "overflow": "scroll",
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "paddingBottom": 0,
 "propagateClick": true,
 "data": {
  "name": "--PANORAMA LIST"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "visible": false,
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "left": "0%",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "id": "Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7",
 "horizontalAlign": "left",
 "right": "0%",
 "children": [
  "this.Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
  "this.Container_221B3648_0C06_E5FD_4199_FCE031AE003B"
 ],
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": false,
 "minHeight": 1,
 "layout": "absolute",
 "top": "0%",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "backgroundOpacity": 0.6,
 "class": "Container",
 "overflow": "scroll",
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "paddingBottom": 0,
 "propagateClick": true,
 "data": {
  "name": "--LOCATION"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "visible": false,
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "left": "0%",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "id": "Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41",
 "horizontalAlign": "left",
 "right": "0%",
 "children": [
  "this.Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3"
 ],
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": false,
 "minHeight": 1,
 "layout": "absolute",
 "top": "0%",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "backgroundOpacity": 0.6,
 "class": "Container",
 "overflow": "scroll",
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "paddingBottom": 0,
 "propagateClick": true,
 "data": {
  "name": "--FLOORPLAN"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "visible": false,
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "left": "0%",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "id": "Container_2820BA13_0D5D_5B97_4192_AABC38F6F169",
 "horizontalAlign": "left",
 "right": "0%",
 "children": [
  "this.Container_28215A13_0D5D_5B97_4198_A7CA735E9E0A"
 ],
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": false,
 "minHeight": 1,
 "layout": "absolute",
 "top": "0%",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "backgroundOpacity": 0.6,
 "class": "Container",
 "overflow": "scroll",
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169, true, 0, null, null, false)",
 "paddingBottom": 0,
 "propagateClick": true,
 "data": {
  "name": "--PHOTOALBUM + text"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "visible": false,
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "left": "0%",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "id": "Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E",
 "horizontalAlign": "left",
 "right": "0%",
 "children": [
  "this.Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536"
 ],
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": false,
 "minHeight": 1,
 "layout": "absolute",
 "top": "0%",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "backgroundOpacity": 0.6,
 "class": "Container",
 "overflow": "scroll",
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "paddingBottom": 0,
 "propagateClick": true,
 "data": {
  "name": "--PHOTOALBUM"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "visible": false,
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "left": "0%",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#04A3E1",
 "contentOpaque": false,
 "id": "Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC",
 "horizontalAlign": "left",
 "right": "0%",
 "children": [
  "this.Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
  "this.Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F"
 ],
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": false,
 "minHeight": 1,
 "layout": "absolute",
 "top": "0%",
 "bottom": "0%",
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "paddingRight": 0,
 "creationPolicy": "inAdvance",
 "backgroundOpacity": 0.6,
 "class": "Container",
 "overflow": "scroll",
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "paddingBottom": 0,
 "propagateClick": true,
 "data": {
  "name": "--REALTOR"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "visible": false,
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
 "horizontalAlign": "center",
 "width": 58,
 "pressedIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed.png",
 "pressedRollOverIconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0_pressed_rollover.png",
 "minHeight": 1,
 "shadow": false,
 "height": 58,
 "paddingRight": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0.png",
 "data": {
  "name": "IconButton FULLSCREEN"
 },
 "verticalAlign": "middle",
 "transparencyActive": true,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "horizontalAlign": "center",
 "width": 58,
 "pressedIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed.png",
 "pressedRollOverIconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D_pressed_rollover.png",
 "minHeight": 1,
 "shadow": false,
 "height": 58,
 "paddingRight": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D.png",
 "data": {
  "name": "IconButton MUTE"
 },
 "verticalAlign": "middle",
 "transparencyActive": true,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 142.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_1_HS_0_1_0_map.gif",
      "width": 73,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.76,
   "hfov": 28.94
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E3797C67_E99F_46C6_41D6_512859B91057, this.camera_783298C3_6F37_4D66_41DB_5F69C78902F4); this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89_1_HS_0_0.png",
      "width": 499,
      "class": "ImageResourceLevel",
      "height": 1347
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.76,
   "roll": 0,
   "yaw": 142.53,
   "hfov": 28.94
  }
 ],
 "id": "overlay_FF2B27FA_EA69_41CE_41E3_452A8ED33922",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 104.89,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_1_HS_0_1_0_map.gif",
      "width": 78,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -7.88,
   "hfov": 46.11
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E345DF46_E99F_42C6_41E7_A8D493F0FD89, this.camera_784288F3_6F37_4D26_4186_7FACD44D7E22); this.mainPlayList.set('selectedIndex', 2)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "useHandCursor": true,
 "id": "overlay_FA7BDB2B_E998_C24F_41E1_8B52BBF3B179",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 110.45,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_1_HS_1_0_map.gif",
      "width": 15,
      "class": "ImageResourceLevel",
      "height": 15
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 17.23,
   "hfov": 39.12
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_FC9A5418_E999_C64A_41B8_D8C38E6E38C9",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "levels": [
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_1_HS_1_0.png",
      "width": 691,
      "class": "ImageResourceLevel",
      "height": 691
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 17.23,
   "yaw": 110.45,
   "hfov": 39.12,
   "distance": 16.83
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Guest Toilet"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -76.7,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_1_HS_2_0_0_map.gif",
      "width": 22,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -26.11,
   "hfov": 7.18
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 0)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -76.7,
   "image": "this.AnimatedImageResource_7E19A3C4_6ED2_C362_41D1_6B92B711F476",
   "pitch": -26.11,
   "hfov": 7.18,
   "distance": 18.81
  }
 ],
 "id": "overlay_FCA35E2A_E99B_424E_41D9_1DC0FCB616A3",
 "data": {
  "label": "Arrow 04a"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -24.02,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_1_HS_3_0_0_map.gif",
      "width": 22,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -16.48,
   "hfov": 7.67
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -24.02,
   "image": "this.AnimatedImageResource_7E1983C5_6ED2_C362_41A6_AE54B8906EF0",
   "pitch": -16.48,
   "hfov": 7.67,
   "distance": 18.81
  }
 ],
 "id": "overlay_FD790408_E999_C64A_41D0_437A03F918D7",
 "data": {
  "label": "Arrow 04a"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 22.04,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_1_HS_4_0_0_map.gif",
      "width": 22,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -18.56,
   "hfov": 7.58
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 22.04,
   "image": "this.AnimatedImageResource_7E1973C6_6ED2_C36E_41C6_FA2D3D344105",
   "pitch": -18.56,
   "hfov": 7.58,
   "distance": 18.81
  }
 ],
 "id": "overlay_FD379C66_E998_C6C6_41D3_591AC724A64C",
 "data": {
  "label": "Arrow 04a"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 26.44,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_1_HS_5_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.03,
   "hfov": 8.94
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_1_HS_5_0.png",
      "width": 151,
      "class": "ImageResourceLevel",
      "height": 151
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -2.03,
   "yaw": 26.44,
   "hfov": 8.94
  }
 ],
 "id": "overlay_FF326159_EA68_DECA_41E5_A84A935B6C22",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -95.29,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.91,
   "hfov": 10.09
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B, this.camera_780AB84F_6F37_4D7E_41D6_06E46FD2B1FC); this.mainPlayList.set('selectedIndex', 3)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58_1_HS_0_0.png",
      "width": 171,
      "class": "ImageResourceLevel",
      "height": 171
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.91,
   "yaw": -95.29,
   "hfov": 10.09
  }
 ],
 "id": "overlay_FFC0EE5A_EA68_C2C9_41E0_E59D59B4C983",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
 "horizontalAlign": "center",
 "width": 58,
 "rollOverIconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB_rollover.png",
 "minHeight": 1,
 "shadow": false,
 "height": 58,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB.png",
 "data": {
  "name": "IconButton VR"
 },
 "verticalAlign": "middle",
 "visible": false,
 "transparencyActive": true,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 37,
 "maxWidth": 49,
 "id": "IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270",
 "width": 100,
 "horizontalAlign": "center",
 "right": 30,
 "rollOverIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_rollover.png",
 "pressedRollOverIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_pressed_rollover.png",
 "shadow": false,
 "minHeight": 1,
 "pressedIconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270_pressed.png",
 "bottom": 8,
 "height": 75,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_1B9ADD00_16C4_0505_41B4_B043CA1AA270.png",
 "data": {
  "name": "IconButton VR"
 },
 "verticalAlign": "middle",
 "transparencyActive": true,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
 "horizontalAlign": "center",
 "width": 58,
 "pressedIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed.png",
 "pressedRollOverIconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96_pressed_rollover.png",
 "minHeight": 1,
 "shadow": false,
 "height": 58,
 "paddingRight": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96.png",
 "data": {
  "name": "IconButton HS "
 },
 "verticalAlign": "middle",
 "transparencyActive": true,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
 "horizontalAlign": "center",
 "width": 58,
 "pressedIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed.png",
 "pressedRollOverIconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A_pressed_rollover.png",
 "minHeight": 1,
 "shadow": false,
 "height": 58,
 "paddingRight": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A.png",
 "verticalAlign": "middle",
 "data": {
  "name": "IconButton GYRO"
 },
 "transparencyActive": true,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -84.15,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_1_HS_0_0_map.gif",
      "width": 32,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 20.87,
   "hfov": 21.64
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E4F37BD8_E999_41CA_4199_ADA35300D3EF",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "levels": [
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_1_HS_0_0.png",
      "width": 390,
      "class": "ImageResourceLevel",
      "height": 193
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 20.87,
   "yaw": -84.15,
   "hfov": 21.64,
   "distance": 50
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "KITCHEN"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -83.53,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_1_HS_1_1_0_map.gif",
      "width": 67,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -6.31,
   "hfov": 27.29
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_79FD882B_6F37_4D26_41D8_489F3A20E0B1, this.panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63); this.startPanoramaWithCamera(this.panorama_E342F1A7_E998_BE46_41EA_F234953D6DC3, this.camera_79FD882B_6F37_4D26_41D8_489F3A20E0B1); this.mainPlayList.set('selectedIndex', 9)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "useHandCursor": true,
 "id": "overlay_E7A987C7_E9A9_C1C6_41EC_E6A518B6FD8B",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -48.19,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_1_HS_2_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.11,
   "hfov": 6.79
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_E7472FB8_E9A9_424A_41E5_ADE31129F903",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_1_HS_2_0.png",
      "width": 115,
      "class": "ImageResourceLevel",
      "height": 116
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 4.11,
   "yaw": -48.19,
   "hfov": 6.79
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -6.57,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_1_HS_3_0_0_map.gif",
      "width": 22,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -17.22,
   "hfov": 16.28
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.setCameraSameSpotAsMedia(this.camera_79F1780A_6F37_4CE7_41D8_AF02A0178931, this.panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63); this.startPanoramaWithCamera(this.panorama_E3457768_E99F_C2CA_41EC_601674B14614, this.camera_79F1780A_6F37_4CE7_41D8_AF02A0178931); this.mainPlayList.set('selectedIndex', 5)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "yaw": -6.57,
   "image": "this.AnimatedImageResource_7E1683BF_6ED2_C31E_41CE_5C814E11661B",
   "pitch": -17.22,
   "hfov": 16.28,
   "distance": 18.81
  }
 ],
 "id": "overlay_F97633F8_E9B7_41C9_41E2_AE1C059D505D",
 "data": {
  "label": "Arrow 04a"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 31.32,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_1_HS_4_0_0_map.gif",
      "width": 22,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -13.87,
   "hfov": 6.9
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 31.32,
   "image": "this.AnimatedImageResource_7E1623C2_6ED2_C366_41D2_8342BC98CCD6",
   "pitch": -13.87,
   "hfov": 6.9,
   "distance": 18.81
  }
 ],
 "id": "overlay_F932542A_E9A9_464E_41D1_9C65CAC33946",
 "data": {
  "label": "Arrow 04a"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 89.98,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_1_HS_5_0_0_map.gif",
      "width": 22,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -27.16,
   "hfov": 6.32
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.mainPlayList.set('selectedIndex', 1)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "yaw": 89.98,
   "image": "this.AnimatedImageResource_7E1603C3_6ED2_C366_41D0_015FAE7A8439",
   "pitch": -27.16,
   "hfov": 6.32,
   "distance": 18.81
  }
 ],
 "id": "overlay_F8E0F555_E9A8_C6DA_41CF_00C764810E38",
 "data": {
  "label": "Arrow 04a"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 18.12,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_1_HS_6_0_map.gif",
      "width": 52,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.15,
   "hfov": 18.17
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "id": "overlay_FB5255E5_E999_41FA_41E1_F74DCBBF10DB",
 "enabledInCardboard": true,
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "image": {
    "levels": [
     {
      "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_1_HS_6_0.png",
      "width": 306,
      "class": "ImageResourceLevel",
      "height": 93
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 2.15,
   "yaw": 18.12,
   "hfov": 18.17,
   "distance": 50
  }
 ],
 "areas": [
  {
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "data": {
  "label": "APT C202"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 3.07,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_1_HS_0_0_0_map.gif",
      "width": 16,
      "class": "ImageResourceLevel",
      "height": 16
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.63,
   "hfov": 12.23
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58, this.camera_78162877_6F37_4D2E_41C1_FDDC06DDB708); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_1_HS_0_0.png",
      "width": 207,
      "class": "ImageResourceLevel",
      "height": 207
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 5.63,
   "yaw": 3.07,
   "hfov": 12.23
  }
 ],
 "id": "overlay_FFB8FAED_EA6F_43CA_41D3_EFEA7BD188FB",
 "data": {
  "label": "Image"
 },
 "rollOverDisplay": false
},
{
 "maps": [
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_1_HS_1_1_0_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "hfov": 90
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_1_HS_1_2_1_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "hfov": 90
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": -90,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_1_HS_1_3_3_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "hfov": 90
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_1_HS_1_4_4_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "hfov": 90
  },
  {
   "class": "HotspotPanoramaOverlayMap",
   "yaw": 0,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_1_HS_1_5_5_map.gif",
      "width": 200,
      "class": "ImageResourceLevel",
      "height": 200
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "hfov": 90
  }
 ],
 "class": "HotspotPanoramaOverlay",
 "areas": [
  {
   "click": "this.startPanoramaWithCamera(this.panorama_E34564F2_E99F_C7DE_41E9_D7BA5A8ADA58, this.camera_7822489A_6F37_4DE6_41D1_2601121700CA); this.mainPlayList.set('selectedIndex', 4)",
   "class": "HotspotPanoramaOverlayArea",
   "mapColor": "#FF0000"
  }
 ],
 "enabledInCardboard": true,
 "useHandCursor": true,
 "items": [
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_1_HS_1_00000.png",
      "width": 964,
      "class": "ImageResourceLevel",
      "height": 964
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "roll": 0,
   "yaw": 0,
   "hfov": 90
  },
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_1_HS_1_00001.png",
      "width": 964,
      "class": "ImageResourceLevel",
      "height": 964
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "yaw": 90,
   "hfov": 90
  },
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_1_HS_1_00003.png",
      "width": 964,
      "class": "ImageResourceLevel",
      "height": 964
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 0,
   "yaw": -90,
   "hfov": 90
  },
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_1_HS_1_00004.png",
      "width": 964,
      "class": "ImageResourceLevel",
      "height": 964
     }
    ],
    "class": "ImageResource"
   },
   "pitch": 90,
   "yaw": 0,
   "hfov": 90
  },
  {
   "class": "HotspotPanoramaOverlayImage",
   "distance": 50,
   "image": {
    "levels": [
     {
      "url": "media/panorama_E34522B7_E99F_C246_41E1_0B6E3BDC5C1B_1_HS_1_00005.png",
      "width": 964,
      "class": "ImageResourceLevel",
      "height": 964
     }
    ],
    "class": "ImageResource"
   },
   "pitch": -90,
   "yaw": 0,
   "hfov": 90
  }
 ],
 "id": "overlay_FF367D0C_EA68_C64A_41B0_C3F9B46B23D4",
 "data": {
  "label": "Polygon"
 },
 "rollOverDisplay": false
},
{
 "id": "Container_EF8F8BD8_E386_8E02_41E5_FC5C5513733A",
 "scrollBarColor": "#000000",
 "width": 110,
 "contentOpaque": false,
 "horizontalAlign": "center",
 "right": "0%",
 "children": [
  "this.IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329"
 ],
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "minHeight": 1,
 "shadow": false,
 "layout": "horizontal",
 "top": "0%",
 "overflow": "visible",
 "height": 110,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "data": {
  "name": "button menu sup"
 },
 "verticalAlign": "middle",
 "paddingLeft": 0
},
{
 "id": "Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "center",
 "right": "0%",
 "children": [
  "this.IconButton_EF7806FA_E38F_8606_41E5_5C4557EBCACB",
  "this.IconButton_EE9FBAB2_E389_8E06_41D7_903ABEDD153A",
  "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
  "this.IconButton_EEEB3760_E38B_8603_41D6_FE6B11A3DA96",
  "this.IconButton_EEFF957A_E389_9A06_41E1_2AD21904F8C0",
  "this.IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
  "this.IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521"
 ],
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": false,
 "minHeight": 1,
 "layout": "vertical",
 "bottom": "0%",
 "height": "85.959%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "overflow": "scroll",
 "gap": 3,
 "width": "91.304%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "data": {
  "name": "-button set"
 },
 "verticalAlign": "top",
 "visible": false,
 "paddingLeft": 0
},
{
 "fontFamily": "Bebas Neue Bold",
 "id": "Label_0DD14F09_1744_0507_41AA_D8475423214A",
 "left": 0,
 "width": 454,
 "horizontalAlign": "left",
 "textShadowColor": "#000000",
 "textShadowOpacity": 1,
 "text": "URBAN.NG",
 "minHeight": 1,
 "shadow": false,
 "top": 5,
 "textShadowHorizontalLength": 0,
 "height": 86,
 "paddingRight": 0,
 "fontColor": "#FFFFFF",
 "fontSize": 90,
 "backgroundOpacity": 0,
 "class": "Label",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "textShadowBlurRadius": 10,
 "propagateClick": true,
 "textShadowVerticalLength": 0,
 "data": {
  "name": "text 1"
 },
 "verticalAlign": "top",
 "textDecoration": "none",
 "fontWeight": "bold",
 "paddingLeft": 0
},
{
 "fontFamily": "Bebas Neue Book",
 "id": "Label_0DD1AF09_1744_0507_41B4_9F5A60B503B2",
 "left": 0,
 "width": 388,
 "horizontalAlign": "left",
 "textShadowColor": "#000000",
 "textShadowOpacity": 1,
 "text": "Webvest limited ",
 "shadow": false,
 "minHeight": 1,
 "fontColor": "#FFFFFF",
 "textShadowHorizontalLength": 0,
 "bottom": 0,
 "height": 46,
 "paddingRight": 0,
 "fontSize": 41,
 "backgroundOpacity": 0,
 "class": "Label",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "fontStyle": "normal",
 "paddingBottom": 0,
 "textShadowBlurRadius": 10,
 "propagateClick": true,
 "textShadowVerticalLength": 0,
 "data": {
  "name": "text 2"
 },
 "verticalAlign": "top",
 "textDecoration": "none",
 "fontWeight": "normal",
 "paddingLeft": 0
},
{
 "maxHeight": 2,
 "maxWidth": 3000,
 "id": "Image_1B99DD00_16C4_0505_41B3_51F09727447A",
 "left": "0%",
 "horizontalAlign": "center",
 "right": "0%",
 "url": "skin/Image_1B99DD00_16C4_0505_41B3_51F09727447A.png",
 "shadow": false,
 "minHeight": 1,
 "bottom": 53,
 "height": 2,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "class": "Image",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "data": {
  "name": "white line"
 },
 "verticalAlign": "middle",
 "scaleMode": "fit_outside",
 "paddingLeft": 0
},
{
 "id": "Container_1B99BD00_16C4_0505_41A4_A3C2452B0288",
 "left": "0%",
 "scrollBarColor": "#000000",
 "width": 1199,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
  "this.Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
  "this.Button_1B9A6D00_16C4_0505_4197_F2108627CC98",
  "this.Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
  "this.Button_1B9A5D00_16C4_0505_41B0_D18F25F377C4",
  "this.Button_1B9A3D00_16C4_0505_41B2_6830155B7D52"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "shadow": false,
 "minHeight": 1,
 "layout": "horizontal",
 "bottom": "0%",
 "height": 51,
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "overflow": "scroll",
 "gap": 3,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": true,
 "data": {
  "name": "-button set container"
 },
 "verticalAlign": "middle",
 "paddingLeft": 30
},
{
 "id": "Container_062A782F_1140_E20B_41AF_B3E5DE341773",
 "left": "10%",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "shadowColor": "#000000",
 "horizontalAlign": "left",
 "right": "10%",
 "children": [
  "this.Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
  "this.Container_062A082F_1140_E20A_4193_DF1A4391DC79"
 ],
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": true,
 "minHeight": 1,
 "top": "5%",
 "shadowBlurRadius": 25,
 "bottom": "5%",
 "shadowHorizontalLength": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "class": "Container",
 "overflow": "scroll",
 "shadowVerticalLength": 0,
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "layout": "horizontal",
 "paddingBottom": 0,
 "propagateClick": false,
 "scrollBarWidth": 10,
 "data": {
  "name": "Global"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadowSpread": 1,
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_062A9830_1140_E215_41A7_5F2BBE5C20E4",
 "left": "10%",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "right",
 "right": "10%",
 "children": [
  "this.IconButton_062A8830_1140_E215_419D_3439F16CCB3E"
 ],
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "minHeight": 1,
 "shadow": false,
 "layout": "vertical",
 "top": "5%",
 "bottom": "80%",
 "paddingRight": 20,
 "backgroundOpacity": 0,
 "class": "Container",
 "overflow": "visible",
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 20,
 "paddingBottom": 0,
 "propagateClick": false,
 "data": {
  "name": "Container X global"
 },
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_23F7B7B7_0C0A_6293_4197_F931EEC6FA48",
 "left": "10%",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "shadowColor": "#000000",
 "horizontalAlign": "left",
 "right": "10%",
 "children": [
  "this.Container_23F797B7_0C0A_6293_41A7_EC89DBCDB93F",
  "this.Container_23F027B7_0C0A_6293_418E_075FCFAA8A19"
 ],
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": true,
 "minHeight": 1,
 "top": "5%",
 "shadowBlurRadius": 25,
 "bottom": "5%",
 "shadowHorizontalLength": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "class": "Container",
 "overflow": "scroll",
 "shadowVerticalLength": 0,
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "layout": "horizontal",
 "paddingBottom": 0,
 "propagateClick": false,
 "scrollBarWidth": 10,
 "data": {
  "name": "Global"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadowSpread": 1,
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_23F097B8_0C0A_629D_4176_D87C90BA32B6",
 "left": "10%",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "right",
 "right": "10%",
 "children": [
  "this.IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA"
 ],
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "minHeight": 1,
 "shadow": false,
 "layout": "vertical",
 "top": "5%",
 "bottom": "80%",
 "paddingRight": 20,
 "backgroundOpacity": 0,
 "class": "Container",
 "overflow": "visible",
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 20,
 "paddingBottom": 0,
 "propagateClick": false,
 "data": {
  "name": "Container X global"
 },
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_39A197B1_0C06_62AF_419A_D15E4DDD2528",
 "left": "15%",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "shadowColor": "#000000",
 "horizontalAlign": "center",
 "right": "15%",
 "children": [
  "this.Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
  "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0"
 ],
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": true,
 "minHeight": 1,
 "top": "7%",
 "shadowBlurRadius": 25,
 "bottom": "7%",
 "shadowHorizontalLength": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "class": "Container",
 "overflow": "visible",
 "shadowVerticalLength": 0,
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "layout": "vertical",
 "paddingBottom": 0,
 "propagateClick": false,
 "scrollBarWidth": 10,
 "data": {
  "name": "Global"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadowSpread": 1,
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_221C1648_0C06_E5FD_4180_8A2E8B66315E",
 "left": "10%",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "shadowColor": "#000000",
 "horizontalAlign": "left",
 "right": "10%",
 "children": [
  "this.Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
  "this.Container_221C9648_0C06_E5FD_41A1_A79DE53B3031"
 ],
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": true,
 "minHeight": 1,
 "top": "5%",
 "shadowBlurRadius": 25,
 "bottom": "5%",
 "shadowHorizontalLength": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "class": "Container",
 "overflow": "scroll",
 "shadowVerticalLength": 0,
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "layout": "horizontal",
 "paddingBottom": 0,
 "propagateClick": false,
 "scrollBarWidth": 10,
 "data": {
  "name": "Global"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadowSpread": 1,
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_221B3648_0C06_E5FD_4199_FCE031AE003B",
 "left": "10%",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "right",
 "right": "10%",
 "children": [
  "this.IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF"
 ],
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": false,
 "minHeight": 1,
 "layout": "vertical",
 "top": "5%",
 "bottom": "80%",
 "paddingRight": 20,
 "backgroundOpacity": 0,
 "class": "Container",
 "overflow": "visible",
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 20,
 "paddingBottom": 0,
 "propagateClick": false,
 "data": {
  "name": "Container X global"
 },
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_2F8A6686_0D4F_6B71_4174_A02FE43588D3",
 "left": "15%",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "shadowColor": "#000000",
 "horizontalAlign": "center",
 "right": "15%",
 "children": [
  "this.Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
  "this.MapViewer"
 ],
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": true,
 "minHeight": 1,
 "top": "7%",
 "shadowBlurRadius": 25,
 "bottom": "7%",
 "shadowHorizontalLength": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "class": "Container",
 "overflow": "visible",
 "shadowVerticalLength": 0,
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "layout": "vertical",
 "paddingBottom": 0,
 "propagateClick": false,
 "scrollBarWidth": 10,
 "data": {
  "name": "Global"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadowSpread": 1,
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_28215A13_0D5D_5B97_4198_A7CA735E9E0A",
 "left": "15%",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "shadowColor": "#000000",
 "horizontalAlign": "center",
 "right": "15%",
 "children": [
  "this.Container_28214A13_0D5D_5B97_4193_B631E1496339",
  "this.Container_2B0BF61C_0D5B_2B90_4179_632488B1209E"
 ],
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": true,
 "minHeight": 1,
 "top": "7%",
 "shadowBlurRadius": 25,
 "bottom": "7%",
 "shadowHorizontalLength": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "class": "Container",
 "overflow": "visible",
 "shadowVerticalLength": 0,
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "layout": "vertical",
 "paddingBottom": 0,
 "propagateClick": false,
 "scrollBarWidth": 10,
 "data": {
  "name": "Global"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadowSpread": 1,
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_2A193C4C_0D3B_DFF0_4161_A2CD128EF536",
 "left": "15%",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "shadowColor": "#000000",
 "horizontalAlign": "center",
 "right": "15%",
 "children": [
  "this.Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC"
 ],
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": true,
 "minHeight": 1,
 "top": "7%",
 "shadowBlurRadius": 25,
 "bottom": "7%",
 "shadowHorizontalLength": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "class": "Container",
 "overflow": "visible",
 "shadowVerticalLength": 0,
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "layout": "vertical",
 "paddingBottom": 0,
 "propagateClick": false,
 "scrollBarWidth": 10,
 "data": {
  "name": "Global"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadowSpread": 1,
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_06C5DBA5_1140_A63F_41AD_1D83A33F1255",
 "left": "10%",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "shadowColor": "#000000",
 "horizontalAlign": "left",
 "right": "10%",
 "children": [
  "this.Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
  "this.Container_06C58BA5_1140_A63F_419D_EC83F94F8C54"
 ],
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "shadow": true,
 "minHeight": 1,
 "top": "5%",
 "shadowBlurRadius": 25,
 "bottom": "5%",
 "shadowHorizontalLength": 0,
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "shadowOpacity": 0.3,
 "class": "Container",
 "overflow": "scroll",
 "shadowVerticalLength": 0,
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "layout": "horizontal",
 "paddingBottom": 0,
 "propagateClick": false,
 "scrollBarWidth": 10,
 "data": {
  "name": "Global"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "shadowSpread": 1,
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_06C43BA5_1140_A63F_41A1_96DC8F4CAD2F",
 "left": "10%",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "right",
 "right": "10%",
 "children": [
  "this.IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81"
 ],
 "scrollBarWidth": 10,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "scrollBarMargin": 2,
 "minHeight": 1,
 "shadow": false,
 "layout": "vertical",
 "top": "5%",
 "bottom": "80%",
 "paddingRight": 20,
 "backgroundOpacity": 0,
 "class": "Container",
 "overflow": "visible",
 "gap": 10,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 20,
 "paddingBottom": 0,
 "propagateClick": false,
 "data": {
  "name": "Container X global"
 },
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 21,
 "rowCount": 6,
 "id": "AnimatedImageResource_7E19A3C4_6ED2_C362_41D1_6B92B711F476",
 "levels": [
  {
   "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_1_HS_2_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 510
  }
 ],
 "frameDuration": 33
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 21,
 "rowCount": 6,
 "id": "AnimatedImageResource_7E1983C5_6ED2_C362_41A6_AE54B8906EF0",
 "levels": [
  {
   "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_1_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 510
  }
 ],
 "frameDuration": 33
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 21,
 "rowCount": 6,
 "id": "AnimatedImageResource_7E1973C6_6ED2_C36E_41C6_FA2D3D344105",
 "levels": [
  {
   "url": "media/panorama_E3797C67_E99F_46C6_41D6_512859B91057_1_HS_4_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 510
  }
 ],
 "frameDuration": 33
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 21,
 "rowCount": 6,
 "id": "AnimatedImageResource_7E1683BF_6ED2_C31E_41CE_5C814E11661B",
 "levels": [
  {
   "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_1_HS_3_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 510
  }
 ],
 "frameDuration": 33
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 21,
 "rowCount": 6,
 "id": "AnimatedImageResource_7E1623C2_6ED2_C366_41D2_8342BC98CCD6",
 "levels": [
  {
   "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_1_HS_4_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 510
  }
 ],
 "frameDuration": 33
},
{
 "colCount": 4,
 "class": "AnimatedImageResource",
 "frameCount": 21,
 "rowCount": 6,
 "id": "AnimatedImageResource_7E1603C3_6ED2_C366_41D0_015FAE7A8439",
 "levels": [
  {
   "url": "media/panorama_E227E68D_E99F_424A_41C9_C80A7CDEFC63_1_HS_5_0.png",
   "width": 480,
   "class": "ImageResourceLevel",
   "height": 510
  }
 ],
 "frameDuration": 33
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329",
 "horizontalAlign": "center",
 "width": 60,
 "pressedIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed.png",
 "pressedRollOverIconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329_pressed_rollover.png",
 "minHeight": 1,
 "shadow": false,
 "height": 60,
 "paddingRight": 0,
 "mode": "toggle",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "if(!this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE.get('visible')){ this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, true, 0, null, null, false) } else { this.setComponentVisibility(this.Container_EF8F8BD8_E386_8E02_41E5_90850B5F0BBE, false, 0, null, null, false) }",
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_EF8F8BD8_E386_8E02_41D6_310FF1964329.png",
 "data": {
  "name": "image button menu"
 },
 "verticalAlign": "middle",
 "transparencyActive": true,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC",
 "horizontalAlign": "center",
 "width": 58,
 "rollOverIconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC_rollover.png",
 "minHeight": 1,
 "shadow": false,
 "height": 58,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.shareTwitter(window.location.href)",
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_EE5807F6_E3BE_860E_41E7_431DDDA54BAC.png",
 "data": {
  "name": "IconButton TWITTER"
 },
 "verticalAlign": "middle",
 "transparencyActive": true,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 58,
 "maxWidth": 58,
 "id": "IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521",
 "horizontalAlign": "center",
 "width": 58,
 "rollOverIconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521_rollover.png",
 "minHeight": 1,
 "shadow": false,
 "height": 58,
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.shareFacebook(window.location.href)",
 "paddingBottom": 0,
 "propagateClick": true,
 "iconURL": "skin/IconButton_EED5213F_E3B9_7A7D_41D8_1B642C004521.png",
 "data": {
  "name": "IconButton FB"
 },
 "verticalAlign": "middle",
 "transparencyActive": true,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "fontFamily": "Montserrat",
 "id": "Button_1B998D00_16C4_0505_41AD_67CAA4AAEFE0",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "width": 120,
 "pressedBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "iconHeight": 0,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.8,
 "minHeight": 1,
 "shadow": false,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontColor": "#FFFFFF",
 "borderColor": "#000000",
 "iconBeforeLabel": true,
 "height": 40,
 "shadowBlurRadius": 15,
 "paddingRight": 0,
 "mode": "push",
 "fontSize": 12,
 "backgroundOpacity": 0,
 "class": "Button",
 "rollOverBackgroundColorRatios": [
  0.01
 ],
 "backgroundColor": [
  "#000000"
 ],
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "label": "HOUSE INFO",
 "paddingBottom": 0,
 "gap": 5,
 "iconWidth": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, true, 0, null, null, false)",
 "propagateClick": true,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "fontStyle": "normal",
 "verticalAlign": "middle",
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "data": {
  "name": "Button house info"
 },
 "backgroundColorRatios": [
  0
 ],
 "cursor": "hand",
 "rollOverShadow": false,
 "fontWeight": "bold",
 "paddingLeft": 0
},
{
 "fontFamily": "Montserrat",
 "id": "Button_1B999D00_16C4_0505_41AB_D0C2E7857448",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "width": 130,
 "pressedBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.8,
 "minHeight": 1,
 "shadow": false,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontColor": "#FFFFFF",
 "borderColor": "#000000",
 "iconBeforeLabel": true,
 "height": 40,
 "shadowBlurRadius": 15,
 "paddingRight": 0,
 "mode": "push",
 "fontSize": 12,
 "backgroundOpacity": 0,
 "class": "Button",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "label": "PANORAMA LIST",
 "paddingBottom": 0,
 "gap": 5,
 "iconWidth": 32,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, true, 0, null, null, false)",
 "propagateClick": true,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "fontStyle": "normal",
 "verticalAlign": "middle",
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "data": {
  "name": "Button panorama list"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "cursor": "hand",
 "fontWeight": "bold",
 "paddingLeft": 0
},
{
 "fontFamily": "Montserrat",
 "id": "Button_1B9A6D00_16C4_0505_4197_F2108627CC98",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "width": 90,
 "pressedBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.8,
 "minHeight": 1,
 "shadow": false,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontColor": "#FFFFFF",
 "borderColor": "#000000",
 "iconBeforeLabel": true,
 "height": 40,
 "shadowBlurRadius": 15,
 "paddingRight": 0,
 "mode": "push",
 "fontSize": 12,
 "backgroundOpacity": 0,
 "class": "Button",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "label": "LOCATION",
 "paddingBottom": 0,
 "gap": 5,
 "iconWidth": 32,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, true, 0, null, null, false)",
 "propagateClick": true,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "fontStyle": "normal",
 "verticalAlign": "middle",
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "data": {
  "name": "Button location"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "cursor": "hand",
 "fontWeight": "bold",
 "paddingLeft": 0
},
{
 "fontFamily": "Montserrat",
 "id": "Button_1B9A4D00_16C4_0505_4193_E0EA69B0CBB0",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "width": 103,
 "pressedBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.8,
 "minHeight": 1,
 "shadow": false,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontColor": "#FFFFFF",
 "borderColor": "#000000",
 "iconBeforeLabel": true,
 "height": 40,
 "shadowBlurRadius": 15,
 "paddingRight": 0,
 "mode": "push",
 "fontSize": 12,
 "backgroundOpacity": 0,
 "class": "Button",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "label": "FLOORPLAN",
 "paddingBottom": 0,
 "gap": 5,
 "iconWidth": 32,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, true, 0, null, null, false)",
 "propagateClick": true,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "fontStyle": "normal",
 "verticalAlign": "middle",
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "data": {
  "name": "Button floorplan"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "cursor": "hand",
 "fontWeight": "bold",
 "paddingLeft": 0
},
{
 "fontFamily": "Montserrat",
 "id": "Button_1B9A5D00_16C4_0505_41B0_D18F25F377C4",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "width": 112,
 "pressedBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.8,
 "minHeight": 1,
 "shadow": false,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontColor": "#FFFFFF",
 "borderColor": "#000000",
 "iconBeforeLabel": true,
 "height": 40,
 "shadowBlurRadius": 15,
 "paddingRight": 0,
 "mode": "push",
 "fontSize": 12,
 "backgroundOpacity": 0,
 "class": "Button",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "label": "PHOTOALBUM",
 "paddingBottom": 0,
 "gap": 5,
 "iconWidth": 32,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, true, 0, null, null, false)",
 "propagateClick": true,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "fontStyle": "normal",
 "verticalAlign": "middle",
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "data": {
  "name": "Button photoalbum"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "cursor": "hand",
 "fontWeight": "bold",
 "paddingLeft": 0
},
{
 "fontFamily": "Montserrat",
 "id": "Button_1B9A3D00_16C4_0505_41B2_6830155B7D52",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "width": 90,
 "pressedBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 0.8,
 "minHeight": 1,
 "shadow": false,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontColor": "#FFFFFF",
 "borderColor": "#000000",
 "iconBeforeLabel": true,
 "height": 40,
 "shadowBlurRadius": 15,
 "paddingRight": 0,
 "mode": "push",
 "fontSize": 12,
 "backgroundOpacity": 0,
 "class": "Button",
 "rollOverBackgroundColorRatios": [
  0
 ],
 "backgroundColor": [
  "#000000",
  "#000000"
 ],
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "label": "REALTOR",
 "paddingBottom": 0,
 "gap": 5,
 "iconWidth": 32,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, true, 0, null, null, false)",
 "propagateClick": true,
 "shadowSpread": 1,
 "rollOverBackgroundColor": [
  "#04A3E1"
 ],
 "fontStyle": "normal",
 "verticalAlign": "middle",
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "data": {
  "name": "Button realtor"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "cursor": "hand",
 "fontWeight": "bold",
 "paddingLeft": 0
},
{
 "id": "Container_062A682F_1140_E20B_41B0_3071FCBF3DC9",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "center",
 "children": [
  "this.Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColor": [
  "#000000"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "class": "Container",
 "width": "85%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "gap": 10,
 "height": "100%",
 "propagateClick": false,
 "data": {
  "name": "-left"
 },
 "backgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "paddingLeft": 0
},
{
 "id": "Container_062A082F_1140_E20A_4193_DF1A4391DC79",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#0069A3",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.Container_062A3830_1140_E215_4195_1698933FE51C",
  "this.Container_062A2830_1140_E215_41AA_EB25B7BD381C",
  "this.Container_062AE830_1140_E215_4180_196ED689F4BD"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.51,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "vertical",
 "overflow": "visible",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 50,
 "backgroundOpacity": 1,
 "class": "Container",
 "width": "50%",
 "borderSize": 0,
 "minWidth": 460,
 "borderRadius": 0,
 "paddingTop": 20,
 "paddingBottom": 20,
 "gap": 0,
 "height": "100%",
 "propagateClick": false,
 "data": {
  "name": "-right"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 50
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_062A8830_1140_E215_419D_3439F16CCB3E",
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_rollover.jpg",
 "pressedRollOverIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed_rollover.jpg",
 "minHeight": 50,
 "shadow": false,
 "width": "25%",
 "pressedIconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E_pressed.jpg",
 "height": "75%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_062AB830_1140_E215_41AF_6C9D65345420, false, 0, null, null, false)",
 "paddingBottom": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_062A8830_1140_E215_419D_3439F16CCB3E.jpg",
 "data": {
  "name": "X"
 },
 "verticalAlign": "middle",
 "transparencyActive": false,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "id": "Container_23F797B7_0C0A_6293_41A7_EC89DBCDB93F",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "center",
 "children": [
  "this.ViewerAreaLabeled_23F787B7_0C0A_6293_419A_B4B58B92DAFC",
  "this.Container_23F7F7B7_0C0A_6293_4195_D6240EBAFDC0"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColor": [
  "#000000"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "class": "Container",
 "width": "85%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "gap": 10,
 "height": "100%",
 "propagateClick": false,
 "data": {
  "name": "-left"
 },
 "backgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "paddingLeft": 0
},
{
 "id": "Container_23F027B7_0C0A_6293_418E_075FCFAA8A19",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#0069A3",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.Container_23F017B8_0C0A_629D_41A5_DE420F5F9331",
  "this.Container_23F007B8_0C0A_629D_41A3_034CF0D91203",
  "this.Container_23F047B8_0C0A_629D_415D_F05EF8619564"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.51,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "vertical",
 "overflow": "visible",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 50,
 "backgroundOpacity": 1,
 "class": "Container",
 "width": "50%",
 "borderSize": 0,
 "minWidth": 460,
 "borderRadius": 0,
 "paddingTop": 20,
 "paddingBottom": 20,
 "gap": 0,
 "height": "100%",
 "propagateClick": false,
 "data": {
  "name": "-right"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 50
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA",
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_rollover.jpg",
 "pressedRollOverIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_pressed_rollover.jpg",
 "minHeight": 50,
 "shadow": false,
 "width": "25%",
 "pressedIconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA_pressed.jpg",
 "height": "75%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_23F0F7B8_0C0A_629D_418A_F171085EFBF8, false, 0, null, null, false)",
 "paddingBottom": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_23F087B8_0C0A_629D_4194_6F34C6CBE1DA.jpg",
 "data": {
  "name": "X"
 },
 "verticalAlign": "middle",
 "transparencyActive": false,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "id": "Container_3A67552A_0C3A_67BD_4195_ECE46CCB34EA",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
  "this.IconButton_38922473_0C06_2593_4199_C585853A1AB3"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "absolute",
 "overflow": "scroll",
 "height": 140,
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "gap": 10,
 "propagateClick": false,
 "data": {
  "name": "header"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0",
 "itemPaddingRight": 3,
 "horizontalAlign": "center",
 "itemHorizontalAlign": "center",
 "selectedItemLabelFontColor": "#04A3E1",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "selectedItemThumbnailShadowBlurRadius": 16,
 "scrollBarVisible": "rollOver",
 "itemBorderRadius": 0,
 "minHeight": 1,
 "shadow": false,
 "width": "100%",
 "itemMaxHeight": 1000,
 "itemLabelGap": 7,
 "selectedItemThumbnailShadowVerticalLength": 0,
 "backgroundColor": [
  "#000000"
 ],
 "rollOverItemThumbnailShadowBlurRadius": 0,
 "paddingRight": 70,
 "itemPaddingLeft": 3,
 "itemMaxWidth": 1000,
 "backgroundOpacity": 0.05,
 "class": "ThumbnailGrid",
 "itemPaddingTop": 3,
 "height": "100%",
 "selectedItemLabelFontWeight": "bold",
 "borderSize": 0,
 "itemThumbnailShadow": false,
 "minWidth": 1,
 "itemBackgroundColorRatios": [],
 "itemBackgroundColor": [],
 "propagateClick": false,
 "itemLabelPosition": "bottom",
 "itemOpacity": 1,
 "rollOverItemThumbnailShadowHorizontalLength": 8,
 "itemLabelFontWeight": "normal",
 "itemBackgroundOpacity": 0,
 "itemLabelTextDecoration": "none",
 "rollOverItemThumbnailShadow": true,
 "paddingLeft": 70,
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#04A3E1",
 "itemLabelFontSize": 14,
 "playList": "this.ThumbnailList_034EDD7A_0D3B_3991_41A5_D706671923C0_playlist",
 "rollOverItemThumbnailShadowVerticalLength": 0,
 "itemThumbnailScaleMode": "fit_outside",
 "itemMinHeight": 50,
 "itemWidth": 220,
 "itemThumbnailOpacity": 1,
 "itemLabelFontColor": "#666666",
 "itemHeight": 156,
 "rollOverItemLabelFontColor": "#04A3E1",
 "itemThumbnailBorderRadius": 0,
 "itemThumbnailHeight": 125,
 "itemMinWidth": 50,
 "itemBackgroundColorDirection": "vertical",
 "gap": 26,
 "borderRadius": 5,
 "itemVerticalAlign": "top",
 "paddingTop": 10,
 "itemPaddingBottom": 3,
 "paddingBottom": 70,
 "itemThumbnailWidth": 220,
 "itemMode": "normal",
 "itemLabelFontStyle": "normal",
 "itemLabelHorizontalAlign": "center",
 "data": {
  "name": "ThumbnailList"
 },
 "backgroundColorRatios": [
  0
 ],
 "selectedItemThumbnailShadowHorizontalLength": 0,
 "verticalAlign": "middle",
 "rollOverItemThumbnailShadowColor": "#04A3E1",
 "itemLabelFontFamily": "Montserrat",
 "selectedItemThumbnailShadow": true
},
{
 "id": "Container_221C0648_0C06_E5FD_4193_12BCE1D6DD6B",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "center",
 "children": [
  "this.WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColor": [
  "#000000"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "class": "Container",
 "width": "85%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "gap": 10,
 "height": "100%",
 "propagateClick": false,
 "data": {
  "name": "-left"
 },
 "backgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "paddingLeft": 0
},
{
 "id": "Container_221C9648_0C06_E5FD_41A1_A79DE53B3031",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#0069A3",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
  "this.Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
  "this.Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.51,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "vertical",
 "overflow": "visible",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 50,
 "backgroundOpacity": 1,
 "class": "Container",
 "width": "15%",
 "borderSize": 0,
 "minWidth": 400,
 "borderRadius": 0,
 "paddingTop": 20,
 "paddingBottom": 20,
 "gap": 0,
 "height": "100%",
 "propagateClick": false,
 "data": {
  "name": "-right"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 50
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF",
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_rollover.jpg",
 "pressedRollOverIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed_rollover.jpg",
 "minHeight": 50,
 "shadow": false,
 "width": "25%",
 "pressedIconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF_pressed.jpg",
 "height": "75%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_221B1648_0C06_E5FD_417F_E6FCCCB4A6D7, false, 0, null, null, false)",
 "paddingBottom": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_221B2648_0C06_E5FD_41A6_F9E27CDB95AF.jpg",
 "data": {
  "name": "X"
 },
 "verticalAlign": "middle",
 "transparencyActive": false,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "id": "Container_2F8A7686_0D4F_6B71_41A9_1A894413085C",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
  "this.IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "absolute",
 "overflow": "scroll",
 "height": 140,
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "gap": 10,
 "propagateClick": false,
 "data": {
  "name": "header"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "id": "MapViewer",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipFontSize": 12,
 "toolTipOpacity": 1,
 "playbackBarHeight": 10,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColorDirection": "vertical",
 "width": "100%",
 "playbackBarRight": 0,
 "toolTipPaddingBottom": 4,
 "minHeight": 1,
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipShadowColor": "#333333",
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "progressBarBorderSize": 6,
 "paddingRight": 0,
 "playbackBarBorderRadius": 0,
 "height": "100%",
 "class": "ViewerArea",
 "toolTipShadowOpacity": 1,
 "playbackBarProgressBorderColor": "#000000",
 "borderSize": 0,
 "minWidth": 1,
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderRadius": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "playbackBarBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipFontFamily": "Arial",
 "toolTipTextShadowOpacity": 0,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "transitionDuration": 500,
 "progressOpacity": 1,
 "paddingLeft": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipFontColor": "#606060",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "progressBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderSize": 1,
 "toolTipShadowHorizontalLength": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipPaddingTop": 4,
 "progressBorderSize": 0,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "progressBorderRadius": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarLeft": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "data": {
  "name": "Floor Plan"
 },
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "playbackBarHeadOpacity": 1,
 "progressBarBackgroundColor": [
  "#3399FF"
 ]
},
{
 "id": "Container_28214A13_0D5D_5B97_4193_B631E1496339",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_28217A13_0D5D_5B97_419A_F894ECABEB04",
  "this.IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "absolute",
 "overflow": "scroll",
 "height": 140,
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "gap": 10,
 "propagateClick": false,
 "data": {
  "name": "header"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_2B0BF61C_0D5B_2B90_4179_632488B1209E",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.ViewerAreaLabeled_281D2361_0D5F_E9B0_41A1_A1F237F85FD7",
  "this.IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
  "this.IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "absolute",
 "overflow": "visible",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "gap": 10,
 "height": "100%",
 "propagateClick": false,
 "data": {
  "name": "Container photo"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_2A19EC4C_0D3B_DFF0_414D_37145C22C5BC",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
  "this.IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
  "this.IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
  "this.IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "absolute",
 "overflow": "visible",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "gap": 10,
 "height": "100%",
 "propagateClick": false,
 "data": {
  "name": "Container photo"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_06C5ABA5_1140_A63F_41A9_850CF958D0DB",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "center",
 "children": [
  "this.Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "absolute",
 "overflow": "scroll",
 "backgroundColor": [
  "#000000"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "class": "Container",
 "width": "55%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "gap": 10,
 "height": "100%",
 "propagateClick": false,
 "data": {
  "name": "-left"
 },
 "backgroundColorRatios": [
  0
 ],
 "verticalAlign": "middle",
 "paddingLeft": 0
},
{
 "id": "Container_06C58BA5_1140_A63F_419D_EC83F94F8C54",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#0069A3",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
  "this.Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
  "this.Container_06C42BA5_1140_A63F_4195_037A0687532F"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.51,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "vertical",
 "overflow": "visible",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 60,
 "backgroundOpacity": 1,
 "class": "Container",
 "width": "45%",
 "borderSize": 0,
 "minWidth": 460,
 "borderRadius": 0,
 "paddingTop": 20,
 "paddingBottom": 20,
 "gap": 0,
 "height": "100%",
 "propagateClick": false,
 "data": {
  "name": "-right"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 60
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81",
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_rollover.jpg",
 "pressedRollOverIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed_rollover.jpg",
 "minHeight": 50,
 "shadow": false,
 "width": "25%",
 "pressedIconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81_pressed.jpg",
 "height": "75%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_06C41BA5_1140_A63F_41AE_B0CBD78DEFDC, false, 0, null, null, false)",
 "paddingBottom": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_06C40BA5_1140_A63F_41AC_FA560325FD81.jpg",
 "data": {
  "name": "X"
 },
 "verticalAlign": "middle",
 "transparencyActive": false,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 1000,
 "maxWidth": 2000,
 "id": "Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A",
 "left": "0%",
 "horizontalAlign": "center",
 "url": "skin/Image_062A182F_1140_E20B_41B0_9CB8FFD6AA5A.jpg",
 "minHeight": 1,
 "shadow": false,
 "width": "100%",
 "top": "0%",
 "height": "100%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "class": "Image",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "data": {
  "name": "Image"
 },
 "verticalAlign": "middle",
 "scaleMode": "fit_outside",
 "paddingLeft": 0
},
{
 "id": "Container_062A3830_1140_E215_4195_1698933FE51C",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "right",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "shadow": false,
 "layout": "horizontal",
 "overflow": "scroll",
 "height": 60,
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 20,
 "paddingBottom": 0,
 "gap": 0,
 "propagateClick": false,
 "data": {
  "name": "Container space"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_062A2830_1140_E215_41AA_EB25B7BD381C",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#E73B2C",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_062AD830_1140_E215_41B0_321699661E7F",
  "this.Button_062AF830_1140_E215_418D_D2FC11B12C47"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.79,
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "shadow": false,
 "layout": "vertical",
 "overflow": "scroll",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "width": "100%",
 "borderSize": 0,
 "minWidth": 100,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 30,
 "gap": 10,
 "height": "100%",
 "propagateClick": false,
 "data": {
  "name": "Container text"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_062AE830_1140_E215_4180_196ED689F4BD",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "width": 370,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "horizontal",
 "overflow": "scroll",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "height": 40,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "gap": 10,
 "propagateClick": false,
 "data": {
  "name": "Container space"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "toolTipOpacity": 1,
 "left": 0,
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipFontSize": 12,
 "id": "ViewerAreaLabeled_23F787B7_0C0A_6293_419A_B4B58B92DAFC",
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "right": 0,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowColor": "#000000",
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColorDirection": "vertical",
 "playbackBarRight": 0,
 "toolTipPaddingBottom": 4,
 "toolTipFontWeight": "normal",
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipShadowColor": "#333333",
 "minHeight": 1,
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "progressBarBorderSize": 6,
 "playbackBarProgressBorderSize": 0,
 "paddingRight": 0,
 "playbackBarBorderRadius": 0,
 "class": "ViewerArea",
 "toolTipShadowOpacity": 1,
 "playbackBarProgressBorderColor": "#000000",
 "borderSize": 0,
 "minWidth": 1,
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderRadius": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "playbackBarBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipFontFamily": "Arial",
 "toolTipTextShadowOpacity": 0,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "transitionDuration": 500,
 "progressOpacity": 1,
 "paddingLeft": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipFontColor": "#606060",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "progressBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "top": 0,
 "bottom": 0,
 "toolTipBorderSize": 1,
 "toolTipShadowHorizontalLength": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipPaddingTop": 4,
 "playbackBarBorderColor": "#FFFFFF",
 "progressBorderSize": 0,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "progressBorderRadius": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarLeft": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "data": {
  "name": "Viewer info 1"
 },
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "playbackBarHeadOpacity": 1,
 "progressBarBackgroundColor": [
  "#3399FF"
 ]
},
{
 "id": "Container_23F7F7B7_0C0A_6293_4195_D6240EBAFDC0",
 "left": "0%",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
  "this.Container_23F7D7B7_0C0A_6293_4195_312C9CAEABE4",
  "this.IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "horizontal",
 "top": "0%",
 "overflow": "scroll",
 "height": "100%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "gap": 10,
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "data": {
  "name": "Container arrows"
 },
 "verticalAlign": "middle",
 "paddingLeft": 0
},
{
 "id": "Container_23F017B8_0C0A_629D_41A5_DE420F5F9331",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "right",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "shadow": false,
 "layout": "horizontal",
 "overflow": "scroll",
 "height": 60,
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 20,
 "paddingBottom": 0,
 "gap": 0,
 "propagateClick": false,
 "data": {
  "name": "Container space"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_23F007B8_0C0A_629D_41A3_034CF0D91203",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#E73B2C",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_23F067B8_0C0A_629D_41A9_1A1C797BB055",
  "this.Button_23F057B8_0C0A_629D_41A2_CD6BDCDB0145"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.79,
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "shadow": false,
 "layout": "vertical",
 "overflow": "scroll",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "width": "100%",
 "borderSize": 0,
 "minWidth": 100,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 30,
 "gap": 10,
 "height": "100%",
 "propagateClick": false,
 "data": {
  "name": "Container text"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_23F047B8_0C0A_629D_415D_F05EF8619564",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "width": 370,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "horizontal",
 "overflow": "scroll",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "height": 40,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "gap": 10,
 "propagateClick": false,
 "data": {
  "name": "Container space"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "HTMLText_3918BF37_0C06_E393_41A1_17CF0ADBAB12",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 100,
 "shadow": false,
 "width": "77.115%",
 "top": "0%",
 "height": "100%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.22vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.22vh;font-family:'Bebas Neue Bold';\">Panorama list:</SPAN></SPAN></DIV></div>",
 "propagateClick": false,
 "data": {
  "name": "HTMLText54192"
 },
 "paddingLeft": 80
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_38922473_0C06_2593_4199_C585853A1AB3",
 "horizontalAlign": "right",
 "right": 20,
 "rollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_rollover.jpg",
 "pressedRollOverIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed_rollover.jpg",
 "minHeight": 50,
 "shadow": false,
 "width": "100%",
 "top": 20,
 "pressedIconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3_pressed.jpg",
 "height": "36.14%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_39DE87B1_0C06_62AF_417B_8CB0FB5C9D15, false, 0, null, null, false)",
 "paddingBottom": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_38922473_0C06_2593_4199_C585853A1AB3.jpg",
 "data": {
  "name": "IconButton X"
 },
 "verticalAlign": "top",
 "transparencyActive": false,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "left": "0%",
 "backgroundColorDirection": "vertical",
 "id": "WebFrame_22F9EEFF_0C1A_2293_4165_411D4444EFEA",
 "right": "0%",
 "url": "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14377.55330038866!2d-73.99492968084243!3d40.75084469078082!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9f775f259%3A0x999668d0d7c3fd7d!2s400+5th+Ave%2C+New+York%2C+NY+10018!5e0!3m2!1ses!2sus!4v1467271743182\" width=\"600\" height=\"450\" frameborder=\"0\" style=\"border:0\" allowfullscreen>",
 "shadow": false,
 "minHeight": 1,
 "top": "0%",
 "scrollEnabled": true,
 "bottom": "0%",
 "backgroundColor": [
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 1,
 "class": "WebFrame",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "data": {
  "name": "WebFrame48191"
 },
 "backgroundColorRatios": [
  0
 ],
 "insetBorder": false,
 "paddingLeft": 0
},
{
 "id": "Container_221C8648_0C06_E5FD_41A0_8247B2B7DEB0",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "right",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "shadow": false,
 "layout": "horizontal",
 "overflow": "scroll",
 "height": 60,
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 20,
 "paddingBottom": 0,
 "gap": 0,
 "propagateClick": false,
 "data": {
  "name": "Container space"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_221B7648_0C06_E5FD_418B_12E57BBFD8EC",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#E73B2C",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
  "this.Button_221B5648_0C06_E5FD_4198_40C786948FF0"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.79,
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "shadow": false,
 "layout": "vertical",
 "overflow": "scroll",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "width": "100%",
 "borderSize": 0,
 "minWidth": 100,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 30,
 "gap": 10,
 "height": "100%",
 "propagateClick": false,
 "data": {
  "name": "Container text"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_221B4648_0C06_E5FD_4194_30EDC4E7D1B6",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "width": 370,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "horizontal",
 "overflow": "scroll",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "height": 40,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "gap": 10,
 "propagateClick": false,
 "data": {
  "name": "Container space"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "HTMLText_2F8A4686_0D4F_6B71_4183_10C1696E2923",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 100,
 "shadow": false,
 "width": "77.115%",
 "top": "0%",
 "height": "100%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.22vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.22vh;font-family:'Bebas Neue Bold';\">FLOORPLAN:</SPAN></SPAN></DIV></div>",
 "propagateClick": false,
 "data": {
  "name": "HTMLText54192"
 },
 "paddingLeft": 80
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E",
 "horizontalAlign": "right",
 "right": 20,
 "rollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_rollover.jpg",
 "pressedRollOverIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed_rollover.jpg",
 "minHeight": 50,
 "shadow": false,
 "width": "100%",
 "top": 20,
 "pressedIconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E_pressed.jpg",
 "height": "36.14%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2F8BB687_0D4F_6B7F_4190_9490D02FBC41, false, 0, null, null, false)",
 "paddingBottom": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_2F8A5686_0D4F_6B71_41A1_13CF877A165E.jpg",
 "data": {
  "name": "IconButton X"
 },
 "verticalAlign": "top",
 "transparencyActive": false,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "id": "HTMLText_28217A13_0D5D_5B97_419A_F894ECABEB04",
 "left": "0%",
 "scrollBarColor": "#000000",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 100,
 "shadow": false,
 "width": "77.115%",
 "top": "0%",
 "height": "100%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:5.22vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:5.22vh;font-family:'Bebas Neue Bold';\">PHOTOALBUM:</SPAN></SPAN></DIV></div>",
 "propagateClick": false,
 "data": {
  "name": "HTMLText54192"
 },
 "paddingLeft": 80
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3",
 "horizontalAlign": "right",
 "right": 20,
 "rollOverIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_rollover.jpg",
 "pressedRollOverIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_pressed_rollover.jpg",
 "minHeight": 50,
 "shadow": false,
 "width": "100%",
 "top": 20,
 "pressedIconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3_pressed.jpg",
 "height": "36.14%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2820BA13_0D5D_5B97_4192_AABC38F6F169, false, 0, null, null, false)",
 "paddingBottom": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_28216A13_0D5D_5B97_41A9_2CAB10DB6CA3.jpg",
 "data": {
  "name": "IconButton X"
 },
 "verticalAlign": "top",
 "transparencyActive": false,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "id": "ViewerAreaLabeled_281D2361_0D5F_E9B0_41A1_A1F237F85FD7",
 "left": "0%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipFontSize": 12,
 "toolTipOpacity": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColorDirection": "vertical",
 "width": "100%",
 "playbackBarRight": 0,
 "toolTipPaddingBottom": 4,
 "minHeight": 1,
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipShadowColor": "#333333",
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "progressBarBorderSize": 6,
 "paddingRight": 0,
 "playbackBarBorderRadius": 0,
 "height": "100%",
 "class": "ViewerArea",
 "toolTipShadowOpacity": 1,
 "playbackBarProgressBorderColor": "#000000",
 "borderSize": 0,
 "minWidth": 1,
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderRadius": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "playbackBarBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipFontFamily": "Arial",
 "toolTipTextShadowOpacity": 0,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "transitionDuration": 500,
 "progressOpacity": 1,
 "paddingLeft": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipFontColor": "#606060",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "progressBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "top": "0%",
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderSize": 1,
 "toolTipShadowHorizontalLength": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipPaddingTop": 4,
 "progressBorderSize": 0,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "progressBorderRadius": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarLeft": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "data": {
  "name": "Viewer photoalbum + text 1"
 },
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "playbackBarHeadOpacity": 1,
 "progressBarBackgroundColor": [
  "#3399FF"
 ]
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D",
 "left": 10,
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_rollover.png",
 "pressedRollOverIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_pressed_rollover.png",
 "shadow": false,
 "minHeight": 50,
 "top": "20%",
 "pressedIconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D_pressed.png",
 "bottom": "20%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "width": "14.22%",
 "borderSize": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_2BE71718_0D55_6990_41A5_73D31D902E1D.png",
 "data": {
  "name": "IconButton <"
 },
 "verticalAlign": "middle",
 "transparencyActive": false,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14",
 "horizontalAlign": "center",
 "right": 10,
 "rollOverIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_rollover.png",
 "pressedRollOverIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_pressed_rollover.png",
 "shadow": false,
 "minHeight": 50,
 "top": "20%",
 "pressedIconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14_pressed.png",
 "bottom": "20%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "width": "14.22%",
 "borderSize": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_28BF3E40_0D4B_DBF0_41A3_D5D2941E6E14.png",
 "data": {
  "name": "IconButton >"
 },
 "verticalAlign": "middle",
 "transparencyActive": false,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "toolTipBorderColor": "#767676",
 "toolTipShadowSpread": 0,
 "id": "ViewerAreaLabeled_2A198C4C_0D3B_DFF0_419F_C9A785406D9C",
 "left": "0%",
 "playbackBarProgressBackgroundColorDirection": "vertical",
 "toolTipFontSize": 12,
 "toolTipOpacity": 1,
 "progressBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeight": 10,
 "toolTipShadowBlurRadius": 3,
 "playbackBarBackgroundColor": [
  "#FFFFFF"
 ],
 "playbackBarHeadWidth": 6,
 "toolTipTextShadowColor": "#000000",
 "playbackBarBackgroundColorDirection": "vertical",
 "width": "100%",
 "playbackBarRight": 0,
 "toolTipPaddingBottom": 4,
 "minHeight": 1,
 "shadow": false,
 "toolTipTextShadowBlurRadius": 3,
 "toolTipShadowColor": "#333333",
 "toolTipFontWeight": "normal",
 "playbackBarProgressBorderRadius": 0,
 "progressBarBorderRadius": 0,
 "playbackBarProgressBorderSize": 0,
 "progressBarBorderSize": 6,
 "paddingRight": 0,
 "playbackBarBorderRadius": 0,
 "height": "100%",
 "class": "ViewerArea",
 "toolTipShadowOpacity": 1,
 "playbackBarProgressBorderColor": "#000000",
 "borderSize": 0,
 "minWidth": 1,
 "toolTipFontStyle": "normal",
 "playbackBarHeadBorderRadius": 0,
 "progressLeft": 0,
 "playbackBarHeadBorderColor": "#000000",
 "playbackBarHeadBorderSize": 0,
 "playbackBarProgressOpacity": 1,
 "propagateClick": false,
 "playbackBarBorderSize": 0,
 "vrPointerSelectionColor": "#FF6600",
 "toolTipFontFamily": "Arial",
 "toolTipTextShadowOpacity": 0,
 "playbackBarBackgroundOpacity": 1,
 "playbackBarHeadBackgroundColor": [
  "#111111",
  "#666666"
 ],
 "playbackBarHeadShadowColor": "#000000",
 "vrPointerSelectionTime": 2000,
 "progressRight": 0,
 "transitionDuration": 500,
 "progressOpacity": 1,
 "paddingLeft": 0,
 "progressBarBackgroundColorDirection": "vertical",
 "firstTransitionDuration": 0,
 "progressHeight": 6,
 "playbackBarHeadShadow": true,
 "progressBottom": 2,
 "toolTipFontColor": "#606060",
 "playbackBarHeadShadowHorizontalLength": 0,
 "playbackBarHeadBackgroundColorDirection": "vertical",
 "progressBackgroundOpacity": 1,
 "toolTipBackgroundColor": "#F6F6F6",
 "playbackBarOpacity": 1,
 "playbackBarProgressBackgroundColor": [
  "#3399FF"
 ],
 "playbackBarHeadShadowOpacity": 0.7,
 "vrPointerColor": "#FFFFFF",
 "transitionMode": "blending",
 "progressBarOpacity": 1,
 "displayTooltipInTouchScreens": true,
 "top": "0%",
 "playbackBarBorderColor": "#FFFFFF",
 "toolTipBorderSize": 1,
 "toolTipShadowHorizontalLength": 0,
 "toolTipShadowVerticalLength": 0,
 "toolTipPaddingTop": 4,
 "progressBorderSize": 0,
 "toolTipPaddingLeft": 6,
 "toolTipPaddingRight": 6,
 "toolTipDisplayTime": 600,
 "progressBorderRadius": 0,
 "progressBackgroundColorRatios": [
  0.01
 ],
 "playbackBarProgressBackgroundColorRatios": [
  0
 ],
 "playbackBarHeadShadowVerticalLength": 0,
 "playbackBarLeft": 0,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "toolTipBorderRadius": 3,
 "playbackBarHeadBackgroundColorRatios": [
  0,
  1
 ],
 "playbackBarHeadShadowBlurRadius": 3,
 "progressBarBorderColor": "#0066FF",
 "playbackBarHeadHeight": 15,
 "progressBarBackgroundColorRatios": [
  0
 ],
 "playbackBarBottom": 0,
 "data": {
  "name": "Viewer photoalbum 1"
 },
 "progressBackgroundColorDirection": "vertical",
 "progressBorderColor": "#FFFFFF",
 "playbackBarHeadOpacity": 1,
 "progressBarBackgroundColor": [
  "#3399FF"
 ]
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482",
 "left": 10,
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_rollover.png",
 "pressedRollOverIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed_rollover.png",
 "shadow": false,
 "minHeight": 50,
 "top": "20%",
 "pressedIconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482_pressed.png",
 "bottom": "20%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "width": "14.22%",
 "borderSize": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_2A19BC4C_0D3B_DFF0_419F_D0DCB12FF482.png",
 "data": {
  "name": "IconButton <"
 },
 "verticalAlign": "middle",
 "transparencyActive": false,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510",
 "horizontalAlign": "center",
 "right": 10,
 "rollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_rollover.png",
 "pressedRollOverIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed_rollover.png",
 "shadow": false,
 "minHeight": 50,
 "top": "20%",
 "pressedIconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510_pressed.png",
 "bottom": "20%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "width": "14.22%",
 "borderSize": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_2A19AC4C_0D3B_DFF0_4181_A2C230C2E510.png",
 "data": {
  "name": "IconButton >"
 },
 "verticalAlign": "middle",
 "transparencyActive": false,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 60,
 "maxWidth": 60,
 "id": "IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1",
 "horizontalAlign": "right",
 "right": 20,
 "rollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_rollover.jpg",
 "pressedRollOverIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed_rollover.jpg",
 "minHeight": 50,
 "shadow": false,
 "width": "10%",
 "top": 20,
 "pressedIconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1_pressed.jpg",
 "height": "10%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 50,
 "borderRadius": 0,
 "paddingTop": 0,
 "click": "this.setComponentVisibility(this.Container_2A1A5C4D_0D3B_DFF0_41A9_8FC811D03C8E, false, 0, null, null, false)",
 "paddingBottom": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_2A19CC4C_0D3B_DFF0_41AA_D2AC34177CF1.jpg",
 "data": {
  "name": "IconButton X"
 },
 "verticalAlign": "top",
 "transparencyActive": false,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "maxHeight": 1000,
 "maxWidth": 2000,
 "id": "Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397",
 "left": "0%",
 "horizontalAlign": "center",
 "url": "skin/Image_06C5BBA5_1140_A63F_41A7_E6D01D4CC397.jpg",
 "minHeight": 1,
 "shadow": false,
 "width": "100%",
 "top": "0%",
 "height": "100%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "class": "Image",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "data": {
  "name": "Image"
 },
 "verticalAlign": "bottom",
 "scaleMode": "fit_outside",
 "paddingLeft": 0
},
{
 "id": "Container_06C59BA5_1140_A63F_41B1_4B41E3B7D98D",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "right",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 0,
 "shadow": false,
 "layout": "horizontal",
 "overflow": "scroll",
 "height": 60,
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 20,
 "paddingBottom": 0,
 "gap": 0,
 "propagateClick": false,
 "data": {
  "name": "Container space"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_06C46BA5_1140_A63F_4151_B5A20B4EA86A",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#E73B2C",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
  "this.Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.79,
 "scrollBarVisible": "rollOver",
 "minHeight": 520,
 "shadow": false,
 "layout": "vertical",
 "overflow": "scroll",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "width": "100%",
 "borderSize": 0,
 "minWidth": 100,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 30,
 "gap": 10,
 "height": "100%",
 "propagateClick": false,
 "data": {
  "name": "Container text"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "Container_06C42BA5_1140_A63F_4195_037A0687532F",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "width": 370,
 "contentOpaque": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "horizontal",
 "overflow": "scroll",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "height": 40,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "gap": 10,
 "propagateClick": false,
 "data": {
  "name": "Container space"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "id": "HTMLText_062AD830_1140_E215_41B0_321699661E7F",
 "scrollBarColor": "#04A3E1",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "width": "100%",
 "height": "100%",
 "paddingRight": 10,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 20,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.83vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.74vh;font-family:'Bebas Neue Bold';\">URBAN.NG</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.74vh;font-family:'Bebas Neue Bold';\">webvest limited</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.48vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.48vh;font-family:'Bebas Neue Bold';\">consectetur adipiscing elit. Morbi bibendum pharetra lorem, accumsan san nulla.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.2vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.2vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.2vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.2vh;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.72vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.72vh;font-family:'Bebas Neue Bold';\"><B>Donec feugiat:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.2vh;\"> \u2022 Nisl nec mi sollicitudin facilisis </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.2vh;\"> \u2022 Nam sed faucibus est.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.2vh;\"> \u2022 Ut eget lorem sed leo.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.2vh;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.2vh;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.72vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.72vh;font-family:'Bebas Neue Bold';\"><B>urban.ng</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.7vh;font-family:'Bebas Neue Bold';\"><B>$150,000</B></SPAN></SPAN></DIV></div>",
 "propagateClick": false,
 "data": {
  "name": "HTMLText"
 },
 "paddingLeft": 10
},
{
 "fontFamily": "Bebas Neue Bold",
 "id": "Button_062AF830_1140_E215_418D_D2FC11B12C47",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "pressedBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 1,
 "minHeight": 1,
 "shadow": false,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#04A3E1"
 ],
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "paddingRight": 0,
 "mode": "push",
 "fontSize": "3vh",
 "backgroundOpacity": 0.7,
 "class": "Button",
 "width": "46%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "label": "urban.ng",
 "fontStyle": "normal",
 "paddingBottom": 0,
 "gap": 5,
 "iconWidth": 32,
 "propagateClick": false,
 "data": {
  "name": "Button"
 },
 "backgroundColorRatios": [
  0
 ],
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "shadowSpread": 1,
 "verticalAlign": "middle",
 "cursor": "hand",
 "height": "9%",
 "fontWeight": "normal",
 "paddingLeft": 0
},
{
 "maxHeight": 150,
 "maxWidth": 150,
 "id": "IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD",
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_rollover.png",
 "pressedRollOverIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_pressed_rollover.png",
 "minHeight": 70,
 "shadow": false,
 "width": "12%",
 "pressedIconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD_pressed.png",
 "height": "8%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 70,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_23F7E7B7_0C0A_6293_419F_D3D84EB3AFBD.png",
 "data": {
  "name": "IconButton <"
 },
 "verticalAlign": "middle",
 "transparencyActive": true,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "id": "Container_23F7D7B7_0C0A_6293_4195_312C9CAEABE4",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "absolute",
 "overflow": "scroll",
 "height": "30%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "class": "Container",
 "gap": 10,
 "width": "80%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "data": {
  "name": "Container separator"
 },
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "maxHeight": 150,
 "maxWidth": 150,
 "id": "IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4",
 "horizontalAlign": "center",
 "rollOverIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_rollover.png",
 "pressedRollOverIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_pressed_rollover.png",
 "minHeight": 70,
 "shadow": false,
 "width": "12%",
 "pressedIconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4_pressed.png",
 "height": "8%",
 "paddingRight": 0,
 "mode": "push",
 "backgroundOpacity": 0,
 "class": "IconButton",
 "borderSize": 0,
 "minWidth": 70,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "iconURL": "skin/IconButton_23F037B7_0C0A_6293_41A2_C1707EE666E4.png",
 "data": {
  "name": "IconButton >"
 },
 "verticalAlign": "middle",
 "transparencyActive": true,
 "cursor": "hand",
 "paddingLeft": 0
},
{
 "id": "HTMLText_23F067B8_0C0A_629D_41A9_1A1C797BB055",
 "scrollBarColor": "#04A3E1",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "width": "100%",
 "height": "100%",
 "paddingRight": 10,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 20,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.83vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.74vh;font-family:'Bebas Neue Bold';\">Urban.ng</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.74vh;font-family:'Bebas Neue Bold';\">webvest limited</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:3.48vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.48vh;font-family:'Bebas Neue Bold';\">consectetur adipiscing elit. Morbi bibendum pharetra lorem, accumsan san nulla.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.2vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.2vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.2vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.2vh;\">Integer gravida dui quis euismod placerat. Maecenas quis accumsan ipsum. Aliquam gravida velit at dolor mollis, quis luctus mauris vulputate. Proin condimentum id nunc sed sollicitudin.</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:2.72vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.72vh;font-family:'Bebas Neue Bold';\"><B>Donec feugiat:</B></SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.2vh;\"> \u2022 Nisl nec mi sollicitudin facilisis </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.2vh;\"> \u2022 Nam sed faucibus est.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.2vh;\"> \u2022 Ut eget lorem sed leo.</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.2vh;\"> \u2022 Sollicitudin tempor sit amet non urna. </SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.2vh;\"> \u2022 Aliquam feugiat mauris sit amet.</SPAN></SPAN></DIV></div>",
 "propagateClick": false,
 "data": {
  "name": "HTMLText"
 },
 "paddingLeft": 10
},
{
 "fontFamily": "Bebas Neue Bold",
 "id": "Button_23F057B8_0C0A_629D_41A2_CD6BDCDB0145",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "pressedBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 1,
 "minHeight": 1,
 "shadow": false,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontColor": "#FFFFFF",
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#04A3E1"
 ],
 "shadowBlurRadius": 6,
 "borderColor": "#000000",
 "paddingRight": 0,
 "mode": "push",
 "fontSize": "3vh",
 "backgroundOpacity": 0.7,
 "class": "Button",
 "width": "46%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "label": "urban.ng",
 "fontStyle": "normal",
 "paddingBottom": 0,
 "gap": 5,
 "iconWidth": 32,
 "propagateClick": false,
 "data": {
  "name": "Button"
 },
 "backgroundColorRatios": [
  0
 ],
 "textDecoration": "none",
 "pressedBackgroundOpacity": 1,
 "shadowSpread": 1,
 "verticalAlign": "middle",
 "cursor": "hand",
 "height": "9%",
 "fontWeight": "normal",
 "paddingLeft": 0
},
{
 "id": "HTMLText_221B6648_0C06_E5FD_41A0_77851DC2C548",
 "scrollBarColor": "#04A3E1",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "width": "100%",
 "height": "100%",
 "paddingRight": 10,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 20,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.83vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.74vh;font-family:'Bebas Neue Bold';\">location</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.96vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.48vh;font-family:'Bebas Neue Bold';\">address line 1</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.48vh;font-family:'Bebas Neue Bold';\">address line 2</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:5.22vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.2vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac.</SPAN></SPAN></DIV></div>",
 "propagateClick": false,
 "data": {
  "name": "HTMLText"
 },
 "paddingLeft": 10
},
{
 "fontFamily": "Bebas Neue Bold",
 "id": "Button_221B5648_0C06_E5FD_4198_40C786948FF0",
 "backgroundColorDirection": "vertical",
 "layout": "horizontal",
 "width": 207,
 "pressedBackgroundColorRatios": [
  0
 ],
 "horizontalAlign": "center",
 "iconHeight": 32,
 "shadowColor": "#000000",
 "rollOverBackgroundOpacity": 1,
 "minHeight": 1,
 "shadow": false,
 "pressedBackgroundColor": [
  "#000000"
 ],
 "fontColor": "#FFFFFF",
 "borderColor": "#000000",
 "iconBeforeLabel": true,
 "backgroundColor": [
  "#04A3E1"
 ],
 "shadowBlurRadius": 6,
 "paddingRight": 0,
 "mode": "push",
 "fontSize": 34,
 "backgroundOpacity": 0.7,
 "class": "Button",
 "height": 59,
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "label": "urban.ng",
 "fontStyle": "normal",
 "paddingBottom": 0,
 "gap": 5,
 "iconWidth": 32,
 "propagateClick": false,
 "shadowSpread": 1,
 "data": {
  "name": "Button"
 },
 "backgroundColorRatios": [
  0
 ],
 "textDecoration": "none",
 "visible": false,
 "pressedBackgroundOpacity": 1,
 "verticalAlign": "middle",
 "cursor": "hand",
 "fontWeight": "normal",
 "paddingLeft": 0
},
{
 "id": "HTMLText_0B42C466_11C0_623D_4193_9FAB57A5AC33",
 "scrollBarColor": "#04A3E1",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "width": "100%",
 "height": "45%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:7.83vh;font-family:'Bebas Neue Bold';\">___</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:6.09vh;font-family:'Bebas Neue Bold';\">real estate agent</SPAN></SPAN></DIV></div>",
 "propagateClick": false,
 "data": {
  "name": "HTMLText18899"
 },
 "paddingLeft": 0
},
{
 "id": "Container_0D9BF47A_11C0_E215_41A4_A63C8527FF9C",
 "backgroundColorDirection": "vertical",
 "scrollBarColor": "#000000",
 "contentOpaque": false,
 "horizontalAlign": "left",
 "children": [
  "this.Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
  "this.HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE"
 ],
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "layout": "horizontal",
 "overflow": "scroll",
 "backgroundColor": [
  "#FFFFFF",
  "#FFFFFF"
 ],
 "paddingRight": 0,
 "backgroundOpacity": 0.3,
 "class": "Container",
 "width": "100%",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "gap": 10,
 "height": "80%",
 "propagateClick": false,
 "data": {
  "name": "- content"
 },
 "backgroundColorRatios": [
  0,
  1
 ],
 "verticalAlign": "top",
 "paddingLeft": 0
},
{
 "maxHeight": 200,
 "maxWidth": 200,
 "id": "Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0",
 "horizontalAlign": "left",
 "url": "skin/Image_0B48D65D_11C0_6E0F_41A2_4D6F373BABA0.jpg",
 "minHeight": 1,
 "shadow": false,
 "width": "25%",
 "height": "100%",
 "paddingRight": 0,
 "backgroundOpacity": 0,
 "class": "Image",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 0,
 "propagateClick": false,
 "data": {
  "name": "agent photo"
 },
 "verticalAlign": "top",
 "scaleMode": "fit_inside",
 "paddingLeft": 0
},
{
 "id": "HTMLText_0B4B0DC1_11C0_6277_41A4_201A5BB3F7AE",
 "scrollBarColor": "#04A3E1",
 "scrollBarWidth": 10,
 "scrollBarMargin": 2,
 "scrollBarOpacity": 0.5,
 "scrollBarVisible": "rollOver",
 "minHeight": 1,
 "shadow": false,
 "width": "75%",
 "height": "100%",
 "paddingRight": 10,
 "backgroundOpacity": 0,
 "class": "HTMLText",
 "borderSize": 0,
 "minWidth": 1,
 "borderRadius": 0,
 "paddingTop": 0,
 "paddingBottom": 10,
 "html": "<div style=\"text-align:left; color:#000; \"><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#04a3e1;font-size:3.48vh;font-family:'Bebas Neue Bold';\">john doe</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:2.07vh;font-family:'Bebas Neue Bold';\">licensed real estate salesperson</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.96vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.96vh;font-family:'Bebas Neue Bold';\">Tlf.: +11 111 111 111</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.96vh;font-family:'Bebas Neue Bold';\">jhondoe@realestate.com</SPAN></SPAN></DIV><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"color:#999999;font-size:1.96vh;font-family:'Bebas Neue Bold';\">www.loremipsum.com</SPAN></SPAN></DIV><p STYLE=\"margin:0; line-height:1.2vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.2vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><p STYLE=\"margin:0; line-height:1.2vh;\"><BR STYLE=\"letter-spacing:0vh;color:#000000;font-size:1.09vh;font-family:Arial, Helvetica, sans-serif;\"/></p><DIV STYLE=\"text-align:left;\"><SPAN STYLE=\"letter-spacing:0vh;color:#000000;font-family:Arial, Helvetica, sans-serif;\"><SPAN STYLE=\"font-size:1.2vh;\">Mauris aliquet neque quis libero consequat vestibulum. Donec lacinia consequat dolor viverra sagittis. Praesent consequat porttitor risus, eu condimentum nunc. Proin et velit ac sapien luctus efficitur egestas ac augue. Nunc dictum, augue eget eleifend interdum, quam libero imperdiet lectus, vel scelerisque turpis lectus vel ligula. Duis a porta sem. Maecenas sollicitudin nunc id risus fringilla, a pharetra orci iaculis. Aliquam turpis ligula, tincidunt sit amet consequat ac, imperdiet non dolor.</SPAN></SPAN></DIV></div>",
 "propagateClick": false,
 "data": {
  "name": "HTMLText19460"
 },
 "paddingLeft": 10
}],
 "verticalAlign": "top",
 "mouseWheelEnabled": true,
 "buttonToggleMute": "this.IconButton_EED073D3_E38A_9E06_41E1_6CCC9722545D",
 "data": {
  "name": "Player468"
 },
 "paddingLeft": 0
};

    
    function HistoryData(playList) {
        this.playList = playList;
        this.list = [];
        this.pointer = -1;
    }

    HistoryData.prototype.add = function(index){
        if(this.pointer < this.list.length && this.list[this.pointer] == index) {
            return;
        }
        ++this.pointer;
        this.list.splice(this.pointer, this.list.length - this.pointer, index);
    };

    HistoryData.prototype.back = function(){
        if(!this.canBack()) return;
        this.playList.set('selectedIndex', this.list[--this.pointer]);
    };

    HistoryData.prototype.forward = function(){
        if(!this.canForward()) return;
        this.playList.set('selectedIndex', this.list[++this.pointer]);
    };

    HistoryData.prototype.canBack = function(){
        return this.pointer > 0;
    };

    HistoryData.prototype.canForward = function(){
        return this.pointer >= 0 && this.pointer < this.list.length-1;
    };
    //

    if(script.data == undefined)
        script.data = {};
    script.data["history"] = {};    //playListID -> HistoryData

    TDV.PlayerAPI.defineScript(script);
})();
