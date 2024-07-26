document.addEventListener("DOMContentLoaded", () => {
    // Element ekle
    function newElement() {
      let inputValue = document.getElementById("task").value.trim();
      if (inputValue === "") {
        showToast("error");
        return;
      }
      let li = document.createElement("li");
      li.appendChild(document.createTextNode(inputValue));
      document.getElementById("list").appendChild(li);
      saveTasks();
      document.getElementById("task").value = "";
  
      // Silme düğmesi ekle
      let span = document.createElement("span");
      let txt = document.createTextNode("\u00D7");
      span.className = "close";
      span.appendChild(txt);
      li.appendChild(span);
  
      // Silme fonksiyonu ekle
      span.onclick = function() {
        let div = this.parentElement;
        div.style.display = "none";
        saveTasks();
      };
  
      showToast("success");
    }
  
    // Yapıldı işaretleme
    let list = document.querySelector("ul");
    list.addEventListener("click", function(ev) {
      if (ev.target.tagName === "LI") {
        ev.target.classList.toggle("checked");
        saveTasks();
      }
    }, false);
  
    // Toast göster
    function showToast(type) {
      let toast = document.getElementById(type === "success" ? "liveToast" : "liveToastError");
      $(toast).toast("show");
    }
  
    // Local Storage kaydet
    function saveTasks() {
      let tasks = [];
      document.querySelectorAll("#list li").forEach(li => {
        tasks.push({
          text: li.childNodes[0].nodeValue,
          checked: li.classList.contains("checked")
        });
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Local Storage'dan yükle
    function loadTasks() {
      let tasks = JSON.parse(localStorage.getItem("tasks"));
      if (tasks) {
        tasks.forEach(task => {
          let li = document.createElement("li");
          li.appendChild(document.createTextNode(task.text));
          if (task.checked) {
            li.classList.add("checked");
          }
          document.getElementById("list").appendChild(li);
  
          // Silme düğmesi ekle
          let span = document.createElement("span");
          let txt = document.createTextNode("\u00D7");
          span.className = "close";
          span.appendChild(txt);
          li.appendChild(span);
  
          // Silme fonksiyonu ekle
          span.onclick = function() {
            let div = this.parentElement;
            div.style.display = "none";
            saveTasks();
          };
        });
      }
    }
  
    // Başlat
    loadTasks();
  
    // Ekle düğmesi
    document.getElementById("liveToastBtn").onclick = newElement;
  });
  