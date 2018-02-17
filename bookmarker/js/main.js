// Listen for form submit
document.getElementById('myForm').addEventListener('submit',saveBookmark);
function saveBookmark(e){
  //get form values
  var siteName=document.getElementById('siteName').value;
  var siteUrl=document.getElementById('siteUrl').value;

  var bookmark={
    name:siteName,
    url:siteUrl
  }
  if(!validateForm(siteName,siteUrl)){
    return false;
  }
  if(localStorage.getItem('bookmarks') === null){
    //init array
    var bookmarks=[];
    // Add to array
    bookmarks.push(bookmark);
    //Set to lacal storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }else{
    //Get bookmarks from local storage
    var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
    //Add bookmarks to array
    bookmarks.push(bookmark);
    //Re-set back to local storage
    localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  }
  //clear form
  document.getElementById('myForm').reset();
  //Re-fecth bookmarks
  fetchBookmarks()
  // prevent form from submitting
  e.preventDefault();
}
//Delete bookmarks
function deleteBookmark(url){
  var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
  for(var i=0;i<bookmarks.length;i++){
    if(bookmarks[i].url==url){
      bookmarks.splice(i,1);
    }
  }
  localStorage.setItem('bookmarks',JSON.stringify(bookmarks));
  fetchBookmarks()
}
// fetch bookmarks
function fetchBookmarks(){
  //Get bookmarks from local storage
  var bookmarks=JSON.parse(localStorage.getItem('bookmarks'));
  //Get output
  var bookmarksResults = document.getElementById('bookmarksResults');
  //Build output
  bookmarksResults.innerHTML= '';
  for(var i =0;i<bookmarks.length;i++){
    var name= bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML+='<div class="well">'+
                                  '<h3>'+name+
                                  ' <a class="btn btn-info" target="_blank" href="'+url+'">Visit </a>'+

                                  '<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#">Delete</a>'+
                                  '</h3>'+
                                  '</div>';
  }
}
function validateForm(siteName,siteUrl){
  if(!siteName || !siteUrl){
    alert('Please fill in the form');
    return false;
  }
  var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);
  if (!siteUrl.match(regex)) {
    alert('Please use valid url');
  }
  return true;
}
