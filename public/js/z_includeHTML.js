function includeHTML() {
    let z, elmnt, file, xhttp;

    z = document.getElementsByTagName("*");

    for (let i = 0; i < z.length; i++) {
      elmnt = z[i];
      file = elmnt.getAttribute("include-html");

      if (file) {
        xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
          if (this.readyState == 4) {
            if (this.status == 200) {elmnt.innerHTML = this.responseText;}
            if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
            /* Remove the attribute, and call this function once more: */
            elmnt.removeAttribute("include-html");
            includeHTML();
          }//if
        }//onreadystatechange
 
        xhttp.open("GET", file, true);
        xhttp.send();
        return;
      }//if - file
    }//for
  }//includeHTML


/* 실행 */
window.addEventListener('DOMContentLoaded',()=>{
    includeHTML();
});

/*
<head>
    <!--Script-->
    <script defer src="../js/includeHTML.js"></script>
</head>

<body>
  <!-- HEADER -->
    <div include-html="./header.html"></div>
    <script>includeHTML();</script>

  <!--FOOTER-->
    <div include-html="./footer.html"></div>
    <script>includeHTML();</script>
</body>
*/