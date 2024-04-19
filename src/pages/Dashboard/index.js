import $ from "jquery";
import "datatables.net-dt";
import { Modal } from "flowbite";
import Swal from "sweetalert2";

import { store } from "../../store";

import { parseHtmlFromString, render } from "../../utils/helpers";
import "./style.scss";
import dashboardTemplate from "./templates/dashboard.hbs";
import { getTasks } from "../../store/task-slice";

export function dashboardPage() {
  store.dispatch(getTasks());

  const app = document.getElementById("app");
  const dataMock = [
    {
      id: 1,
      title: "teste",
      type: "teste",
      date: "2021-09-30",
      start_time: "10:00",
      end_time: "12:00",
      description: "teste",
    },
    {
      id: 2,
      title: "teste2",
      type: "teste",
      date: "2021-09-30",
      start_time: "10:00",
      end_time: "12:00",
      description: "teste",
    },
    {
      id: 3,
      title: "teste",
      type: "teste",
      date: "2021-09-30",
      start_time: "10:00",
      end_time: "12:00",
      description: "teste",
    },
    {
      id: 4,
      title: "teste",
      type: "teste",
      date: "2021-09-30",
      start_time: "10:00",
      end_time: "12:00",
      description: "teste",
    },
    {
      id: 5,
      title: "teste",
      type: "teste",
      date: "2021-09-30",
      start_time: "10:00",
      end_time: "12:00",
      description: "teste",
    },
    {
      id: 6,
      title: "teste",
      type: "teste",
      date: "2021-09-30",
      start_time: "10:00",
      end_time: "12:00",
      description: "teste",
    },
    {
      id: 7,
      title: "teste",
      type: "teste",
      date: "2021-09-30",
      start_time: "10:00",
      end_time: "12:00",
      description: "teste",
    },
    {
      id: 8,
      title: "teste",
      type: "teste",
      date: "2021-09-30",
      start_time: "10:00",
      end_time: "12:00",
      description: "teste",
    },
    {
      id: 9,
      title: "teste",
      type: "teste",
      date: "2021-09-30",
      start_time: "10:00",
      end_time: "12:00",
      description: "teste",
    },
    {
      id: 10,
      title: "teste",
      type: "teste",
      date: "2021-09-30",
      start_time: "10:00",
      end_time: "12:00",
      description: "teste",
    },
  ];
  const htmlString = dashboardTemplate({ tasks: dataMock });
  const html = parseHtmlFromString(htmlString);

  const formAddTask = html.querySelector("#form_add_task");
  const deleteButtons = html.querySelectorAll(".delete-button");
  const editButtons = html.querySelectorAll(".edit-button");
  const addTaskButton = html.querySelector(".add_task_button");
  const modalElement = html.querySelector("#crud-modal");

  const modal = new Modal(
    modalElement,
    {
      placement: "bottom-right",
      backdrop: "dynamic",
      backdropClasses: "bg-gray-900/50 dark:bg-gray-900/80 fixed inset-0 z-40",
      closable: true,
      onHide: () => {
        formAddTask.reset();
      },
      onShow: () => {
        console.log("modal is shown");
      },
      onToggle: () => {
        console.log("modal has been toggled");
      },
    },
    {
      id: "crud-modal",
      override: true,
    }
  );

  deleteButtons?.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const id = button.getAttribute("data-task-id");
      const task = dataMock.find((task) => task.id === parseInt(id));

      Swal.fire({
        title: "Are you sure?",
        text: `You will not be able to recover the task: ${task.title}`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Yes, delete it!",
        cancelButtonText: "No, keep it",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your task has been deleted.", "success");
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire("Cancelled", "Your task is safe :)", "error");
        }
      });
    });
  });

  editButtons?.forEach((button) => {
    button.addEventListener("click", (e) => {
      e.preventDefault();
      const id = button.getAttribute("data-task-id");
      const task = dataMock.find((task) => task.id === parseInt(id));
      formAddTask.querySelector("#task_title").value = task.title;
      formAddTask.querySelector("#task_type").value = task.type;
      formAddTask.querySelector("#task_date").value = task.date;
      formAddTask.querySelector("#task_start_time").value = task.start_time;
      formAddTask.querySelector("#task_end_time").value = task.end_time;
      formAddTask.querySelector("#task_description").value = task.description;
      modal.show();
      console.log("edit", id);
    });
  });

  addTaskButton?.addEventListener("click", (e) => {
    e.preventDefault();
    modal.show();
  });

  formAddTask?.addEventListener("submit", (e) => {
    e.preventDefault();
    const formBody = {
      title: formAddTask.querySelector("#task_title")?.value,
      type: formAddTask.querySelector("#task_type")?.value,
      date: formAddTask.querySelector("#task_date")?.value,
      startTime: formAddTask.querySelector("#task_start_time")?.value,
      endTime: formAddTask.querySelector("#task_end_time")?.value,
      descriptin: formAddTask.querySelector("#task_description")?.value,
    };
    console.log(formBody);
  });

  render(html, app, false, () => {
    $(function () {
      $("#example").DataTable();
    });
  });
}
