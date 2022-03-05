class ApiFetch {
  constructor() {
    this.baseUrl = "http://localhost:3000/api";
  }

  headers(options = {}) {
    const contentType = options.isFormData
      ? {}
      : {
          "Content-Type": "application/json",
        };

    return {
      ...contentType,
      Authorization: "Bearer " + localStorage.getItem("userToken"),
    };
  }

  post(path, body, options = {}) {
    return fetch(this.baseUrl + path, {
      method: "POST",
      headers: this.headers(options),
      body: options.isFormData ? body : JSON.stringify(body),
    }).then((res) => res.json());
  }
}

export const apiFetch = new ApiFetch();
