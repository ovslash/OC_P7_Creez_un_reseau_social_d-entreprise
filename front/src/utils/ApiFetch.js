import router from "../router/index";

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

  // structure commune des requetes POST
  post(path, body, options = {}) {
    return fetch(this.baseUrl + path, {
      method: "POST",
      headers: this.headers(options),
      body: options.isFormData ? body : JSON.stringify(body),
    }).then((res) => res.json());
  }

  // structure commune des requetes GET
  get(path) {
    return fetch(this.baseUrl + path, {
      method: "GET",
      headers: this.headers(),
    }).then((res) => {
      if (res.status === 401) {
        localStorage.clear();
        alert("Veuillez vous reconnecter");
        router.push({ name: "Login" });
      }
      return res.json();
    });
  }
}

export const apiFetch = new ApiFetch();
