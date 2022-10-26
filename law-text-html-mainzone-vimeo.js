/***
 *    @author Victor Chimenti, MSCS
 *    @see Seattle University School of Law Mainzone Vimeo Video
 *    @file output-profile.js
 *          Law - Video Mainzone Vimeo
 *          ID: 6118
 *          law/text/html
 *
 *      Document will write once when the page loads
 *
 *      @version 2.2
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
        };

    } catch (error) {

        return {
            isError: true,
            message: error.message
        };
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
    let vmvDict = {

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
    let beginningHTML = '<div class="embeddedVideoWrapper contentItem ytv col card border-0 rounded-0" id="vmvmain' + vmvDict.contentId.content + '" data-position-default="Main" data-position-selected="Main">';
    let endingHTML = '</div>';
    let closeCardFooter = '</div>';
    let closeCardBody = '</div>';
    let openVideoWrapper = '<div class="embeddedVideo">';
    let closeVideoWrapper = '</div>';
    let openVideoInner = '<div class="embeddedVideoInner container-fluid g-0">';
    let closeVideoInner = '</div>';
    let anchorWrap = vmvDict.anchorTag.content || '<span class="d-none hidden visually-hidden">No content anchor</span>';




    /***
     *  parse for video tag options
     * 
     * */

    let videoString = (vmvDict.title.content) ?
        '<iframe src="https://player.vimeo.com/video/' + vmvDict.videoId.content + '?&autoplay=false&loop=true&byline=false&controls=true&muted=false&portrait=false&title=true&speed=true&background=1&api=1" loading="lazy" title="' + vmvDict.title.content + '" class="card-img-top"></iframe>' :
        '<iframe src="https://player.vimeo.com/video/' + vmvDict.videoId.content + '?&autoplay=false&loop=true&byline=false&controls=true&muted=false&portrait=false&title=true&speed=true&background=1&api=1" loading="lazy" title="' + vmvDict.contentName.content + '" class="card-img-top"></iframe>';





    /***
     *  define body wrapper
     * 
     * */
    let openCardBody = (vmvDict.title.content || vmvDict.description.content || vmvDict.linkPath.content) ?
        '<div class="card-body">' :
        '<div class="card-body visually-hidden">';




    /***
     *  parse for title
     * 
     * */
    let cardTitle = (vmvDict.title.content) ?
        '<h3 class="card-title videoTitle">' + vmvDict.title.content + '</h3>' :
        '<h3 class="sr-only">' + vmvDict.contentName.content + '</h3>';




    /***
     *  parse for description
     * 
     * */
    let cardBody = (vmvDict.description.content) ?
        '<p class="card-text videoDescription">' + vmvDict.description.content + '</p>' :
        '<span class="visually-hidden videoDescription">No Description Entered</span>';




    /***
     *  parse for link
     * 
     * */
    let cardLink = (vmvDict.linkPath.content && vmvDict.linkText.content) ?
        '<p class="card-text videoLink"><a href="' + vmvDict.linkPath.content + '" class="card-link" title="For more information visit: ' + vmvDict.linkText.content + '" target="_blank"><em>' + vmvDict.linkText.content + '</em></a></p>' :
        '<span class="videoLink visually-hidden">No Proper Link Provided</span>';




    /***
     *  define footer wrapper
     * 
     * */
    let openCardFooter = (vmvDict.footer.content) ?
        '<div class="card-footer border-0 rounded-0 bg-transparent">' :
        '<div class="card-footer visually-hidden">';




    /***
     *  parse for footer
     * 
     * */
    let cardFooter = (vmvDict.footer.content) ?
        '<p class="card-text cardFooter">' + vmvDict.footer.content + '</p>' :
        '<span class="cardFooter visually-hidden">No Footer provided</span>';




    /***
     *  write document once
     * 
     * */
    writeDocument(
        [
            beginningHTML,
            anchorWrap,
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