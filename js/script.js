{
  'use strict';
  const templates = {
    articleLink: Handlebars.compile(document.querySelector('#template-article-link').innerHTML),
    tagLink: Handlebars.compile(document.querySelector('#template-tag-link').innerHTML),
    authorLink: Handlebars.compile(document.querySelector('#template-author-link').innerHTML),
    tagCloudLink: Handlebars.compile(document.querySelector('#template-tag-cloud-link').innerHTML),
    authorCloudLink: Handlebars.compile(document.querySelector('#template-author-cloud-link').innerHTML),
  }

  const titleClickHandler = function (event) {
    event.preventDefault();
    const clickedElement = this;
    //console.log('Link was clicked!');
    //console.log(event);
    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for (let activeLink of activeLinks) {
      activeLink.classList.remove('active');
    }

    /* [DONE?] add class 'active' to the clicked link */


    //console.log(clickedElement)
    clickedElement.classList.add('active');


    /*[DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.post.active');

    for (let activeArticle of activeArticles) {
      activeArticle.classList.remove('active');
    }

    /*[DONE??] get 'href' attribute from the clicked link */

    const articleSelector = clickedElement.getAttribute('href');
    //console.log(articleSelector);

    /* [done??] find the correct article using the selector (value of 'href' attribute) */

    const targetArticle = document.querySelector(articleSelector);
    //console.log(targetArticle);

    /*[Done??] add class 'active' to the correct article */

    targetArticle.classList.add('active');
    //console.log('targetArticle', targetArticle);


  }
  const optArticleSelector = '.post',
    optTitleSelector = '.post-title',
    optTitleListSelector = '.titles',
    optArticleTagsSelector = '.post-tags .list',
    optArticleAuthorSelector = '.post-author',
    optTagsListSelector = '.tags.list',
    optCloudClassCount = '5',
    optCloudClassPrefix = 'tag-size-',
    optAuthorsListSelector = '.authors.list',
    optAuthorClassCount = '5',
    optAuthorClassPrefix = 'tag-size-';


  function generateTitleLinks(customSelector = '') {
    //console.log(customSelector);

    /* [done??] remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    // console.log(titleList);

    /* [done??] for each article */
    const articles = document.querySelectorAll(optArticleSelector + customSelector);
    //console.log(optArticleSelector);

    for (let article of articles) {

      /* [done??] get the article id */
      const articleId = article.getAttribute('id');
      //console.log(articleId);

      /* [done?]find the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;


      /*[???] get the title from the title element */

      /*[done??] create HTML of the link */
      //const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
      //console.log(linkHTML);
      const linkHTMLData = { id: articleId, title: articleTitle };
      const linkHTML = templates.articleLink(linkHTMLData);

      /*[done??] insert link into titleList */
      titleList.innerHTML = titleList.innerHTML + linkHTML;

      html = linkHTML;


    }
    /*titleList.innerHTML = html;
    console.log(html);*/
    const links = document.querySelectorAll('.titles a');
    //console.log(links);

    for (let link of links) {
      link.addEventListener('click', titleClickHandler);
    }

  }
  generateTitleLinks();


  function calculateTagsParams(tags) {
    const params = { max: 0, min: 999999 };

    for (let tag in tags) {
      // console.log(tag + ' is used ' + tags[tag] + ' times');

      params.max = Math.max(tags[tag], params.max);
      params.min = Math.min(tags[tag], params.min);
    }
    return params;
  }

  function calculateTagClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optCloudClassCount - 1) + 1);

    return optCloudClassPrefix + classNumber;
  }

  function generateTags() {
    /* [NEW] create a new variable allTags with an empty object */
    let allTags = {};

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    //console.log(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find tags wrapper */
      const titleList = article.querySelector(optArticleTagsSelector);
      titleList.innerHTML = '';
      // console.log(titleList);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      // console.log(articleTags);

      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      // console.log(articleTags);

      /* START LOOP: for each tag */
      for (let tag of articleTagsArray) {
        // console.log(tag);

        /* generate HTML of the link */
        //const tagLinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        // console.log(tagLinkHTML);
        const linkHTMLData = { id: tag, title: tag };
        const linkHTML = templates.tagLink(linkHTMLData);

        /* add generated code to html variable */
        html = html + linkHTML;

        /* [NEW] check if this link is NOT already in allTags */
        if (!allTags[tag]) {
          /* [NEW] add tag to allTags object */
          allTags[tag] = 1;
        } else {
          allTags[tag]++;
        }
      }
      /* END LOOP: for each tag */

      /* insert HTML of all the links into the tags wrapper */
      titleList.innerHTML = html;
    }
    /* END LOOP: for every article: */

    /* [NEW] find list of tags in right column */
    const tagList = document.querySelector('.tags');

    /* [NEW] create variable for all links HTML code */
    const tagsParams = calculateTagsParams(allTags);
    //console.log('tagsParams:', tagsParams)


    //let allTagsHTML = '';
    const allTagsData = { tags: [] };

    /* [NEW] START LOOP: for each tag in allTags: */
    for (let tag in allTags) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      //allTagsHTML += tag + ' (' + allTags[tag] + ') ';
      //allTagsHTML += '<li><a href="#tag-'+ tag +'">'+ tag +'</a>(' + allTags[tag] + ')</li>'
      //const tagLinkHTML = '<li><a class="' + calculateTagClass(allTags[tag], tagsParams) + '" href="#tag-' + tag + '">' + tag + '</li>';
      allTagsData.tags.push({
        tag: tag,
        count: allTags[tag],
        className: calculateTagClass(allTags[tag], tagsParams)
      });
    }
    /* [NEW] END LOOP: for each tag in allTags: */

    /*[NEW] add HTML from allTagsHTML to tagList */
    //tagList.innerHTML = allTagsHTML;
    //console.log(allTags);
    tagList.innerHTML = templates.tagCloudLink(allTagsData);
    console.log(allTagsData);

  }

  generateTags();

  function tagClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "tag" and extract tag from the "href" constant */
    const tag = href.replace('#tag-', '');
    console.log('clicked:', tag);

    /* find all tag links with class active */
    const tagLinks = document.querySelectorAll('a.active[href^="#tag-"]');

    /* START LOOP: for each active tag link */
    for (let tagLink of tagLinks) {

      /* remove class active */
      tagLink.classList.remove('active');

      /* END LOOP: for each active tag link */
    }
    /* find all tag links with "href" attribute equal to the "href" constant */
    const tagLinksHref = document.querySelectorAll('a[href="' + href + '"]');

    /* START LOOP: for each found tag link */
    for (let tagLink of tagLinks) {
      /* add class active */

      tagLink.classLink.add('active');
    }
    /* END LOOP: for each found tag link */

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-tags~="' + tag + '"]');
  }

  function addClickListenersToTags() {

    /* find all links to tags */
    const tagLinks = document.querySelectorAll('.post-tags .list a');

    /* START LOOP: for each link */
    for (let tagLink of tagLinks) {

      /* add tagClickHandler as event listener for that link */
      tagLink.addEventListener('click', tagClickHandler);

      /* END LOOP: for each link */
    }
  }

  addClickListenersToTags();


  function calculateAuthorsParams(authors) {
    const params = { max: 0, min: 999999 };

    for (let author in authors) {
      console.log(author + ' is used ' + authors[author] + ' times');

      params.max = Math.max(authors[author], params.max);
      params.min = Math.min(authors[author], params.min);
    }
    return params;
  }

  function calculateAuthorsClass(count, params) {
    const normalizedCount = count - params.min;
    const normalizedMax = params.max - params.min;
    const percentage = normalizedCount / normalizedMax;
    const classNumber = Math.floor(percentage * (optAuthorClassCount - 1) + 1);

    return optAuthorClassPrefix + classNumber;
  }

  function generateAuthors() {

    /* [NEW] create a new variable allAuthors with an empty object */
    let allAuthors = {};
    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);

    /* START LOOP: for every article: */
    for (let article of articles) {

      /* find author wrapper */
      const authorWrapper = article.querySelector(optArticleAuthorSelector);

      /* make html variable with empty string */
      //let linkHtml = '';

      /* get author from data-authors attribute */
      const author = article.getAttribute('data-author');
      console.log(author);

      /* generate HTML of the link */
      //const authorLinkHTML = 'by <a href="#author-' + author + '"><span>' + author + '</span></a>';
      //console.log(authorLinkHTML);
      const linkHTMLData = { id: author, title: author };
      const linkHTML = templates.authorLink(linkHTMLData);
      //console.log(templates.authorLink)
      /* add generated code to html variable */
      html = html + linkHTML;



      /* [NEW] check if this link is NOT already in allAuthor */
      authorWrapper.innerHTML = html;

      if (!allAuthors[author]) {
        /* [NEW] add tag to allAuthors object */
        allAuthors[author] = 1;
      } else {
        allAuthors[author]++;
      }
    
      /* insert HTML of all the links into the authors wrapper */
      //authorWrapper.insertAdjacentHTML('afterbegin', linkHTML)
    }

    /* [NEW] find list of tags in right column */
    //const authorList = document.querySelector('.authors');
    /* END LOOP: for every article: */

    const authorList = document.querySelector(optAuthorsListSelector);
    //let allAuthorHTML = '';
    const allAuthorsData = { authors: [] };

    /* [NEW] create variable for all links HTML code */
    const authorsParams = calculateAuthorsParams(allAuthors);
    console.log('authorsParams:', authorsParams)

    //let allAuthorsLinkHTML = '';
    //authorList.innerHTML = allAuthorHTML


    /* [NEW] START LOOP: for each author in allAuthors: */
    for (let author in allAuthors) {
      /* [NEW] generate code of a link and add it to allTagsHTML */
      allAuthorsData.authors.push({
        author: author,
        count: allAuthors[author],
        className: calculateAuthorsClass(allAuthors[author], authorsParams)
      });

      //allAuthorsHTML += '<li><a href="#author-' + author + '" class ="' + authorLinkHTML + '">' + author + '</a> ' + allAuthors[articleAuthor] + '</li>';
    }
    /*[NEW] add HTML from allTagsHTML to tagList */
    //authorList.innerHTML = allAuthorHTML;
    //console.log(authorList);
    authorList.innerHTML = templates.authorCloudLink(allAuthorsData);
    console.log(allAuthorsData)

  }
  generateAuthors();



  function authorClickHandler(event) {
    /* prevent default action for this event */
    event.preventDefault();

    /* make new constant named "clickedElement" and give it the value of "this" */
    const clickedElement = this;

    /* make a new constant "href" and read the attribute "href" of the clicked element */
    const href = clickedElement.getAttribute('href');

    /* make a new constant "author" and extract tag from the "href" constant */
    const author = href.replace('#author-', '');
    console.log('clicked:', tag);

    /* find all author links with class active */
    const tagLinks = document.querySelectorAll('a.active[href^="#author-"]');

    /* START LOOP: for each active author link */
    for (let tagLink of tagLinks) {

      /* remove class active */
      authorLink.classList.remove('active');

      /* END LOOP: for each active author link */
    }

    /* execute function "generateTitleLinks" with article selector as argument */
    generateTitleLinks('[data-author="' + author + '"]');

  }

  function addClickListenersToAuthors() {
    /* find all links to authors */
    const authorLinks = document.querySelectorAll('.post-authors .list a');

    /* START LOOP: for each link */
    for (let authorLink of authorLinks) {

      /* add tagClickHandler as event listener for that link */
      authorLink.addEventListener('click', authorClickHandler);

      /* END LOOP: for each link */
    }

  }
  addClickListenersToAuthors()
}