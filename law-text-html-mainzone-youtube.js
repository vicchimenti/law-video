/***
 *    @author Victor Chimenti, MSCS
 *    @see Seattle University School of Law Mainzone YouTube Video
 *    @file output-profile.js
 *          Law - Video Mainzone Youtube
 *          ID: 5614
 *          law/text/html
 *
 *      Document will write once when the page loads
 *
 *      @version 1.1
 */





/***
 *      Import T4 Utilities
 */
 importClass(com.terminalfour.publish.utils.BrokerUtils);

 
 
 
 
 /***
  *      Extract values from T4 element tags
  *      and confirm valid existing content item field and trim strings
  */
  function getContentValues(tag) {
 
     try {
 
         let _tag = BrokerUtils.processT4Tags(dbStatement, publishCache, section, content, language, isPreview, tag).trim()
 
         return {
             isError: false,
             content: _tag == '' ? null : _tag
         }
 
     } catch (error) {
 
         return {
             isError: true,
             message: error.message
         }
     }
 }
 
 
 
 
 /***
  *      Write the document
  */
 function writeDocument(array) {
 
     for (let i = 0; i < array.length; i++) {
 
         document.write(array[i]);
     }
 }
 
 
 
 
 /***
  *      Main
  */
 try {
 
 
     /***
      *      Dictionary of content
      * */
     let ytvDict = {
 
         contentName: getContentValues('<t4 type="content" name="Name" output="normal" modifiers="striptags,htmlentities" />'),
         videoId: getContentValues('<t4 type="content" name="Video ID" output="normal" modifiers="striptags,htmlentities" />'),
         title: getContentValues('<t4 type="content" name="Title" output="normal" modifiers="striptags,htmlentities" />'),
         description: getContentValues('<t4 type="content" name="Description" output="normal" modifiers="striptags,htmlentities" />'),
         footer: getContentValues('<t4 type="content" name="Footer" output="normal" modifiers="striptags,htmlentities" />'),
         linkText: getContentValues('<t4 type="content" name="Link" output="linktext" modifiers="nav_sections" />'),
         linkPath: getContentValues('<t4 type="content" name="Link" output="linkurl" modifiers="nav_sections" />'),
         anchorTag: getContentValues('<t4 type="meta" meta="html_anchor" />'),
         contentId: getContentValues('<t4 type="meta" meta="content_id" />')
 
     }
 
 
 
 
     /***
      *  Declare/Assign local variables with base formatting
      * 
      * */
     let openCardBody = '<div class="card-body">';
     let closeCardBody = '</div>';
     let openBodyWrapper = '<div class="col-md-8 d-flex align-items-center">';
     let closeBodyWrapper = '</div>';
     let openImageWrapper = '<div class="col-md-4 d-flex align-items-center">';
     let closeImageWrapper = '</div>';


     let openFig = '<figure class="figure visually-hidden">';
     let closeFig = '</figure>'
     let openCard = '<div class="card h-100 w-100 border-0">';
     let closeCard = '</div>';
     let primaryImageString = '<span class="primaryImageString hidden visually-hidden">No Image Provided</span>';
     


     let openVideoWrapper = '<div class="embeddedVideo">';
     let closeVideoWrapper = '</div>';
     let openVideoInner = '<div class="embeddedVideoInner container-fluid g-0">';
     let closeVideoInner = '</div>';
     let beginningHTML = '<div class="embeddedVideoWrapper contentItem ytv col card g-0" id="ytvmain' + ytvDict.contentId.content + '" data-position-default="Main" data-position-selected="Main">';
     let endingHTML = '</div>';




    /***
    *  parse for video tag options
    * 
    * */

    let videoString = (ytvDict.title.content)
                      ? '<iframe src="https://www.youtube.com/embed/' + ytvDict.videoId.content + '?playlist=' + ytvDict.videoId.content + '&mute=0&enablejsapi=1&autoplay=0&loop=0&controls=1&modestbranding=1&playsinline=1&fs=0&iv_load_policy=3&rel=0&disablekb=1&origin=https://law.seattleu.edu" loading="lazy" title="' + ytvDict.title.content + '"></iframe>'
                      : '<iframe src="https://www.youtube.com/embed/' + ytvDict.videoId.content + '?playlist=' + ytvDict.videoId.content + '&mute=0&enablejsapi=1&autoplay=0&loop=0&controls=1&modestbranding=1&playsinline=1&fs=0&iv_load_policy=3&rel=0&disablekb=1&origin=https://law.seattleu.edu" loading="lazy" title="' + ytvDict.contentName.content + '"></iframe>';









 
 
 
     /***
      *  determine if the article contains full text content
      * 
      * */
 
     let cardTitle = (ytvDict.biography.content) ?
         '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0"><a class="card-link" target="_blank" href="' + ytvDict.fullTextLink.content + '" title="' + ytvDict.firstName.content + ' ' + ytvDict.lastName.content + ', ' + ytvDict.primaryTitle.content + '">' + ytvDict.firstName.content + ' ' + ytvDict.lastName.content + '</a></h3>' :
         '<h3 class="card-title d-flex justify-content-center justify-content-md-start text-center text-md-start mt-0">' + ytvDict.firstName.content + ' ' + ytvDict.lastName.content + '</h3>';
 
 
 
 
     /***
      *  parse hidden search fields
      * 
      * */
     let facultyStatusString = (ytvDict.facultyStatus.content) ?
         '<span class="visually-hidden facultyStatus">' + ytvDict.facultyStatus.content + '</span>' :
         '<span class="visually-hidden facultyStatus">No Status Entered</span>';
 
 
 
 
     /***
      *  Parse for image
      * 
      * */
     if (ytvDict.primaryImage.content) {
 
         let imageID = content.get('Profile Pic').getID();
         let mediaInfo = getMediaInfo(imageID);
         let media = readMedia(imageID);
         let info = new ImageInfo;
         info.setInput(media);
 
         let imageDefaultAlt = ytvDict.fullName.content || ytvDict.contentName.content;
 
         primaryImageString = (info.check()) ?
             '<img src="' + ytvDict.primaryImage.content + '" class="articleImage figure-img card-img rounded-circle" aria-label="' + mediaInfo.getName() + '" alt="' + mediaInfo.getDescription() + '" width="' + info.getWidth() + '" height="' + info.getHeight() + '" loading="auto" />' :
             '<img src="' + ytvDict.primaryImage.content + '" class="articleImage figure-img card-img rounded-circle" alt="' + imageDefaultAlt + '" loading="auto" />';
 
         openFig = '<figure class="figure">';
     }
 
 
 
 
     /***
      *  write document once
      * 
      * */
     writeDocument(
         [
             beginningHTML,
             ytvDict.anchorTag.content,
             openCardBody,
             openVideoWrapper,
             openVideoInner,

             videoString,

             closeVideoInner,
             closeVideoWrapper,


             openImageWrapper,

             openFig,

             primaryImageString,

             closeFig,

             closeImageWrapper,

             openBodyWrapper,

             openCardBody,

             cardTitle,

             closeBodyWrapper,



             closeCardBody,
             endingHTML
         ]
     );
 
 
 
 
 } catch (err) {
     document.write(err.message);
 }



 <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="...">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>

<div class="embeddedVideoWrapper autoplay contentItem col card text-center border-0 g-0" id="id<t4 type='meta' meta='content_id' />" data-position-default="Main" data-position-selected="Main">
  <t4 type="meta" meta="html_anchor" />

  <div class="embeddedVideo">
    <div class="embeddedVideoInner container-fluid g-0">
      <iframe src="https://www.youtube.com/embed/<t4 type='content' name='Video ID' output='normal' modifiers='striptags' />?playlist=<t4 type='content' name='Video ID' output='normal' modifiers='striptags' />&mute=0&enablejsapi=1&autoplay=0&loop=1&controls=1&modestbranding=1&playsinline=1&fs=0&iv_load_policy=3&rel=0&disablekb=1&origin=https://law.seattleu.edu" loading="lazy" title="<t4 type='content' name='Name' output='normal' modifiers='striptags,htmlentities' />"></iframe>
    </div>
  </div>

  <div class="card-img-overlay">
    <div class="container standardContent mt-3 pt-3">
      <div class="d-flex flex-column align-items-center">

        <div class="card-header bg-transparent border-0 m-3 mt-5 p-3 pt-5">
          <t4 type="content" name="Title" output="selective-output" modifiers="striptags,htmlentities" format="<h2 class=&quot;card-title fs-1&quot;>$value</h2>" />
        </div>
        
        <div class="card-body">
          <t4 type="content" name="Description" output="selective-output" modifiers="striptags,htmlentities" format="<p class=&quot;card-text text-white fs-3&quot;>$value</p>" />
          <t4 type="content" name="Footer" output="selective-output" modifiers="striptags,htmlentities" format="<p class=&quot;card-text text-white fs-2&quot;>$value</p>" />
        </div>
        
      </div>
    </div>
  </div>
</div>
