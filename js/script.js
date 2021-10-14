{
'use strict';

const titleClickHandler = function(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    console.log(event);
    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
      activeLink.classList.remove('active');
    }
  
    /* [DONE?] add class 'active' to the clicked link */
    

    console.log(clickedElement )
    clickedElement.classList.add('active');
    
  
    /*[DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.post.active');

    for(let activeArticle of activeArticles){
      activeArticle.classList.remove('active');
    }
  
    /*[DONE??] get 'href' attribute from the clicked link */
    
    const articleSelector = clickedElement.getAttribute('href');
    console.log(articleSelector);

    /* [done??] find the correct article using the selector (value of 'href' attribute) */
    
    const targetArticle = document.querySelector(articleSelector);
    console.log(targetArticle);

    /*[Done??] add class 'active' to the correct article */

     targetArticle.classList.add('active');
     console.log('targetArticle', targetArticle);

  
  }
     const optArticleSelector = '.post',
     optTitleSelector = '.post-title',
     optTitleListSelector = '.titles';
     optArticleTagsSelector = '.post-tags .list'

function generateTitleLinks(){

    /* [done??] remove contents of titleList */
      const titleList = document.querySelector(optTitleListSelector);
      titleList.innerHTML='';
      console.log(titleList);

    /* [done??] for each article */
      const articles = document.querySelectorAll(optArticleSelector);
      console.log(optArticleSelector);

      for(let article of articles){
        
        /* [done??] get the article id */
        const articleId = article.getAttribute('id');
        console.log(articleId);

        /* [done?]find the title element */
        const articleTitle = article.querySelector(optTitleSelector).innerHTML;


        /*[???] get the title from the title element */

        /*[done??] create HTML of the link */
        const linkHTML = '<li><a href="#' + articleId + '"><span>' + articleTitle + '</span></a></li>';
        console.log(linkHTML);

        /*[done??] insert link into titleList */
        titleList.innerHTML = titleList.innerHTML + linkHTML;
        
        html = linkHTML;
        
      
      }
      /*titleList.innerHTML = html;
      console.log(html);*/
      const links = document.querySelectorAll('.titles a');
      console.log( links);
        
      for(let link of links){
        link.addEventListener('click', titleClickHandler);
      }

    } 
generateTitleLinks();





  
  

/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/

  function generateTags(){

    /* find all articles */
    const articles = document.querySelectorAll(optArticleSelector);
    console.log(optArticleSelector);

    /* START LOOP: for every article: */
    for(let article of articles){

      /* find tags wrapper */
      const titleList = article.querySelector(optArticleTagsSelector);
      titleList.innerHTML='';
      console.log(titleList);

      /* make html variable with empty string */
      let html = '';

      /* get tags from data-tags attribute */
      const articleTags = article.getAttribute('data-tags');
      console.log(articleTags);
  
      /* split tags into array */
      const articleTagsArray = articleTags.split(' ');
      console.log(articleTags);

      /* START LOOP: for each tag */
      for(let tag of articleTagsArray){
      console.log(tag);
      
        /* generate HTML of the link */
        const tagLinkHTML = '<li><a href="#tag-' + tag + '"><span>' + tag + '</span></a></li>';
        console.log(tagLinkHTML);

        /* add generated code to html variable */
        html = tagLinkHTML;
      }
      /* END LOOP: for each tag */
  
      /* insert HTML of all the links into the tags wrapper */
    }
    /* END LOOP: for every article: */
  }
  
  generateTags();



}