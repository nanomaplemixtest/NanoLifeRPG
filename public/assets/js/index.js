
console.log("Scripte loaded hell yea");
console.log("Scripte loaded hell yea");

var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
       // Typical action to be performed when the document is ready:
       console.log("HAHAHAHAHAH");
       console.log(this.response)
    }
};
xhttp.open("GET", "/users/me", true);

xhttp.setRequestHeader('Authorization','Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1Y2UyNTlhN2ZhNTc5MTM5NTRkZmFlYjAiLCJpYXQiOjE1NTgzMzc5NTl9.kYIhTliXvqqPAIIZssAhIOPJKaK6vhr_0lnyFyvNs4I')

xhttp.send();

