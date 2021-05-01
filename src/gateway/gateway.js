const baseUrl = "https://60871340a3b9c200173b78a2.mockapi.io/events";
// const baseUrl = "https://events.free.beeceptor.com";
// const baseUrl = "https://crudcrud.com/api/4acf51b0e63b4a9ba1420bbdfe5b745f/events";
// const baseUrl = "https://crudcrud.com/api/bf6792e784f6482b94a621f5710b9473/events";
// const baseUrl = "https://crudcrud.com/api/ad9ea15bac044afe8efd53c7654efcae/events";
// const baseUrl = "https://6086e0a6a3b9c200173b71e0.mockapi.io/api/huyapi/events";

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
