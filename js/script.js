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

    const activeArticles = document.querySelectorAll('#article-1');

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



     const optArticleSelector = '.post',
     optTitleSelector = '.post-title',
     optTitleListSelector = '.titles';

function generateTitleLinks(){

    /* remove contents of titleList */
      const titleList = document.querySelector(optTitleListSelector);
      titleList.innerHTML='';
      console.log(titleList);

    /* for each article */
      const article = document.querySelectorAll(optArticleSelector);
      console.log(optArticleSelector);


    /* get the article id */
      const articleId = article.getAttribute('id');
      console.log(articleID);

    /* find the title element */

    /* get the title from the title element */

    /* create HTML of the link */

    /* insert link into titleList */

}

generateTitleLinks();




}
  
  const links = document.querySelectorAll('.titles a');
  
  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
/*document.getElementById('test-button').addEventListener('click', function(){
    const links = document.querySelectorAll('.titles a');
    console.log('links:', links);
  });*/


  