import $ from "jquery";
import "datatables.net-dt";
import { Modal } from "flowbite";
import Swal from "sweetalert2";

import { store } from "../../store";

import { parseHtmlFromString, render } from "../../utils/helpers";
import "./style.scss";
import dashboardTemplate from "./templates/dashboard.hbs";
import { getTasks } from "../../store/task-slice";

import * as taskService from "../../services/task.service";

export function dashboardPage() {
  store.dispatch(getTasks());
  const tasks = store?.getState()?.task?.value || [];

  const app = document.getElementById("app");
  const htmlString = dashboardTemplate({ tasks: tasks });
  const html = parseHtmlFromString(htmlString);

  const formAddTask = html.querySelector("#form_add_task");
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
    },
    {
      id: "crud-modal",
      override: true,
    }
  );

  addTaskButton?.addEventListener("click", (e) => {
    e.preventDefault();
    modal.show();
  });

  formAddTask?.addEventListener("submit", async (e) => {
    e.preventDefault();
    const task_id = formAddTask.querySelector("#task_id")?.value;
    const formBody = {
      title: formAddTask.querySelector("#task_title")?.value,
      type: formAddTask.querySelector("#task_type")?.value,
      date: formAddTask.querySelector("#task_date")?.value,
      start_time: formAddTask.querySelector("#task_start_time")?.value,
      end_time: formAddTask.querySelector("#task_end_time")?.value,
      description: formAddTask.querySelector("#task_description")?.value,
    };

    try {
      if (task_id) {
        const body = { ...formBody, id: task_id };

        await taskService.updateTask(body);
      } else {
        await taskService.createTask(formBody);
      }
      Swal.fire({
        icon: "success",
        title: "Task saved successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      store.dispatch(getTasks());
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "An error occurred when trying to register your task, try again later.",
      });
    } finally {
      modal.hide();
    }
  });

  render(html, app, false, () => {
    $(function () {
      const table = $("#table-tasks").DataTable();

      store.subscribe(() => {
        const tasks = store.getState()?.task?.value || [];
        const parseTasks = tasks.map((task) => {
          const buttons = `<div class="action_button">
          <button class="hover:text-indigo-600 edit-button" data-task-id="${task.id}"><i class="fas fa-pencil-alt"></i></button>
          <button class="hover:text-red-600 delete-button" data-task-id="${task.id}"><i class="fas fa-trash-alt"></i></button>
      </div>`;

          return [
            task.title,
            task.description,
            task.type,
            task.date,
            task.start_time,
            task.end_time,
            buttons,
          ];
        });

        table.clear();
        table.rows.add(parseTasks);
        table.draw();

        const editButtons = html.querySelectorAll(".edit-button");
        const deleteButtons = html.querySelectorAll(".delete-button");

        deleteButtons?.forEach((button) => {
          button.addEventListener("click", (e) => {
            e.preventDefault();
            const id = button.getAttribute("data-task-id");
            const task = tasks.find((task) => task.id === parseInt(id));

            Swal.fire({
              title: "Are you sure?",
              text: `You will not be able to recover the task: ${task.title}`,
              icon: "warning",
              showCancelButton: true,
              confirmButtonText: "Yes, delete it!",
              cancelButtonText: "No, keep it",
            }).then(async (result) => {
              if (result.isConfirmed) {
                await taskService.deleteTask(id);
                store.dispatch(getTasks());
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
            const task = tasks.find((task) => task.id === parseInt(id));
            formAddTask.querySelector("#task_title").value = task.title;
            selectedItem(formAddTask.querySelector("#task_type"), task.type);

            formAddTask.querySelector("#task_date").value = task.date;
            formAddTask.querySelector("#task_id").value = task.id;
            formAddTask.querySelector("#task_start_time").value =
              task.start_time;
            formAddTask.querySelector("#task_end_time").value = task.end_time;
            formAddTask.querySelector("#task_description").value =
              task.description;
            modal.show();
          });
        });
      });
    });
  });
}

const selectedItem = (selectItem, optionValue) => {
  for (const option of selectItem.options) {
    if (option.value === optionValue) {
      option.selected = true;
      break;
    }
  }
};

store.subscribe(() => {
  const tasks = store?.getState()?.task?.value || [];
  // const htmlString = dashboardPage();
});
