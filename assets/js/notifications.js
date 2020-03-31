const notifications = document.getElementById("jsNotifications");

export function handleNewUser(nickname) {
  const newNotification = document.createElement("div");
  newNotification.innerText = `${nickname} just joined.`;
  newNotification.style.backgroundColor = "rgb(255, 253, 208)";
  notifications.appendChild(newNotification);
}

export function handleUserLeft(nickname) {
  const newNotification = document.createElement("div");
  newNotification.innerText = `${nickname} just left`;
  newNotification.style.backgroundColor = "rgb(255, 253, 208)";
  notifications.appendChild(newNotification);
}
