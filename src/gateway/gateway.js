// const baseUrl = "https://60871340a3b9c200173b78a2.mockapi.io/events";
const baseUrl = "https://608d4a18fe2e9c00171e178c.mockapi.io/events";

export const fetchEventsList = () => {
  return fetch(baseUrl).then((response) => {
    if (response.ok) {
      return response.json();
    }
  });
};

export const createEvent = (eventData) => {
  return fetch(baseUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json;charset=utf-8",
    },
    body: JSON.stringify(eventData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create event");
      }
  })
};

export const deleteEvent = (eventId) => {
  return fetch(`${baseUrl}/${eventId}`, {
    method: "DELETE",
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to delete event");
    }
  });
};
