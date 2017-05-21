var viewerCard = (
  `
  <div id="viewer-image-container" class="viewer-image-container">
    <img src="<%= imageLink %>"/>
  </div>
  <div id="viewer-image-des-container" class="viewer-image-des-container">
    <h2><%= imageTitle %></h2>
    <span>by <%= imageAuthor %></span>
    <span>by <%= imageDescription %></span>
    <ul>
      <li><%= imageLikes %> likes</li>
      <li><%= imageViews %> views</li>
      <li><%= imageBuckets %> buckets</li>
    </ul>
    <ol class="tags">
      <li><%= imageTags %></li>
    </ol>
  </div>
  `
)