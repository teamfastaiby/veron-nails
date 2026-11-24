/* Veron — меню, FAQ, запись */
(function () {
  "use strict";
  var WA = "375296013636";
  var burger = document.getElementById("burger"), drawer = document.getElementById("drawer"), dclose = document.getElementById("drawerClose");
  function setDrawer(open) {
    if (!drawer) return;
    drawer.setAttribute("data-open", open ? "true" : "false");
    drawer.setAttribute("aria-hidden", open ? "false" : "true");
    if (burger) burger.setAttribute("aria-expanded", open ? "true" : "false");
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (burger) burger.addEventListener("click", function () { setDrawer(true); });
  if (dclose) dclose.addEventListener("click", function () { setDrawer(false); });
  if (drawer) drawer.addEventListener("click", function (e) { if (e.target === drawer) setDrawer(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") setDrawer(false); });

  document.querySelectorAll(".faq__q").forEach(function (q) {
    q.addEventListener("click", function () {
      var item = q.closest(".faq__i");
      var open = item.getAttribute("data-open") === "true";
      item.parentElement.querySelectorAll('.faq__i[data-open="true"]').forEach(function (o) { if (o !== item) o.setAttribute("data-open", "false"); });
      item.setAttribute("data-open", open ? "false" : "true");
      q.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });

  document.querySelectorAll("form[data-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var out = form.querySelector(".formout");
      var get = function (id) { var el = form.querySelector("#" + id); return el && el.value ? el.value.trim() : ""; };
      var phone = get("f-phone");
      if (phone.replace(/\D/g, "").length < 9) {
        if (out) out.textContent = "Укажите телефон — перезвоню и подтвержу время.";
        return;
      }
      var lines = ["Запись к мастеру маникюра:"];
      var map = [["f-name", "Имя"], ["f-phone", "Телефон"], ["f-what", "Услуга"], ["f-when", "Желаемое время"], ["f-msg", "Комментарий"]];
      map.forEach(function (p) { var v = get(p[0]); if (v) lines.push(p[1] + ": " + v); });
      var extra = form.getAttribute("data-form");
      if (extra) lines.push(extra);
      window.open("https://wa.me/" + WA + "?text=" + encodeURIComponent(lines.join("\n")), "_blank");
      if (out) out.textContent = "Открыла WhatsApp с готовым сообщением — останется нажать «Отправить».";
    });
  });
})();
