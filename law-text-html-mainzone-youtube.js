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
 *      @version 1.2
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
     let closeCardFooter = '</div>';
     let closeCardBody = '</div>';
     let openVideoWrapper = '<div class="embeddedVideo">';
     let closeVideoWrapper = '</div>';
     let openVideoInner = '<div class="embeddedVideoInner container-fluid g-0">';
     let closeVideoInner = '</div>';
     let beginningHTML = '<div class="embeddedVideoWrapper contentItem ytv col card border rounded-0" id="ytvmain' + ytvDict.contentId.content + '" data-position-default="Main" data-position-selected="Main">';
     let endingHTML = '</div>';




    /***
    *  parse for video tag options
    * 
    * */

    let videoString = (ytvDict.title.content)
                      ? '<iframe src="https://www.youtube.com/embed/' + ytvDict.videoId.content + '?playlist=' + ytvDict.videoId.content + '&mute=0&enablejsapi=1&autoplay=0&loop=0&controls=1&modestbranding=1&playsinline=1&fs=0&iv_load_policy=3&rel=0&disablekb=1&origin=https://law.seattleu.edu" loading="lazy" title="' + ytvDict.title.content + '" class="card-img-top"></iframe>'
                      : '<iframe src="https://www.youtube.com/embed/' + ytvDict.videoId.content + '?playlist=' + ytvDict.videoId.content + '&mute=0&enablejsapi=1&autoplay=0&loop=0&controls=1&modestbranding=1&playsinline=1&fs=0&iv_load_policy=3&rel=0&disablekb=1&origin=https://law.seattleu.edu" loading="lazy" title="' + ytvDict.contentName.content + '" class="card-img-top"></iframe>';




    /***
      *  define body wrapper
      * 
      * */
     let openCardBody = (ytvDict.title.content || ytvDict.description.content || ytvDict.linkPath.content)
                        ? '<div class="card-body">'
                        : '<div class="card-body visually-hidden">';




     /***
      *  parse for title
      * 
      * */
     let cardTitle =  (ytvDict.title.content)
                      ? '<h3 class="card-title videoTitle">' + ytvDict.title.content + '</h3>'
                      : '<h3 class="sr-only">' + ytvDict.contentName.content + '</h3>';




    /***
      *  parse for description
      * 
      * */
     let cardBody = (ytvDict.description.content)
                    ? '<p class="card-text videoDescription">' + ytvDict.description.content + '</p>'
                    : '<span class="visually-hidden videoDescription">No Description Entered</span>';




    /***
      *  parse for link
      * 
      * */
     let cardLink = (ytvDict.linkPath.content && ytvDict.linkText.content)
                    ? '<p class="card-text videoLink"><a href="' + ytvDict.linkPath.content + '" class="card-link" title="For more information visit: ' + ytvDict.linkText.content + '" target="_blank"><em>' + ytvDict.linkText.content + '</em></a></p>'
                    : '<span class="videoLink visually-hidden">No Proper Link Provided</span>';




    /***
      *  define footer wrapper
      * 
      * */
     let openCardFooter = (ytvDict.footer.content)
                          ? '<div class="card-footer">'
                          : '<div class="card-footer visually-hidden">';




    /***
      *  parse for footer
      * 
      * */
     let cardFooter = (ytvDict.footer.content)
                      ? '<p class="card-text cardFooter">' + ytvDict.linkText.content + '</p>'
                      : '<span class="cardFooter visually-hidden">No Footer provided</span>';
 
 
 
 
     /***
      *  write document once
      * 
      * */
     writeDocument(
         [
             beginningHTML,
             ytvDict.anchorTag.content,
             openVideoWrapper,
             openVideoInner,
             videoString,
             closeVideoInner,
             closeVideoWrapper,
             openCardBody,
             cardTitle,
             cardLink,
             cardBody,
             closeCardBody,
             openCardFooter,
             cardFooter,
             closeCardFooter,
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
