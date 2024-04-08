document.addEventListener("DOMContentLoaded", () => {
  const ckTag = document.getElementById("id_a");
  const evtBtnTag1 = document.getElementById("id_b");
  const evtBtnTag2 = document.getElementById("id_c");
  const evtBtnTag3 = document.getElementById("id_d");
  const evtBtnTag4 = document.getElementById("id_e");

  ckTag.addEventListener("click", (event) => {
    const chckValue = event.currentTarget.checked;

    evtBtnTag1.checked = chckValue;
    evtBtnTag2.checked = chckValue;
    evtBtnTag3.checked = chckValue;
    evtBtnTag4.checked = chckValue;
  });

  evtBtnTag1.addEventListener("click", (event) => {
    if (event.currentTarget.checked == false) {
      ckTag.checked = false;
    }
  });
  evtBtnTag1.addEventListener("click", (event) => {
    if (event.currentTarget.checked == false) {
      ckTag.checked = false;
    }
  });
  evtBtnTag3.addEventListener("click", (event) => {
    if (event.currentTarget.checked == false) {
      ckTag.checked = false;
    }
  });
  evtBtnTag4.addEventListener("click", (event) => {
    if (event.currentTarget.checked == false) {
      ckTag.checked = false;
    }
  });
});

document.addEventListener();
