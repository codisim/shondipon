
type RequestMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

interface ApiOptions extends RequestInit {
  data?: any;
}

class ApiService {
  private async request<T>(
    url: string,
    method: RequestMethod,
    options: ApiOptions = {}
  ): Promise<T> {
    const { data, headers, ...customConfig } = options;

    const config: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      ...customConfig,
    };

    if (data) {
      config.body = JSON.stringify(data);
    }

    try {
      const response = await fetch(url, config);

      // Handle 401 Unauthorized globally if needed (e.g., redirect to login)
      if (response.status === 401) {
        // Optional: Trigger logout or redirect
        // window.location.href = '/login'; 
      }

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
      }

      // Check if response has content before parsing JSON
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.indexOf("application/json") !== -1) {
         return await response.json();
      }
      
      return {} as T; // Return empty object for non-JSON successful responses
      
    } catch (error) {
      console.error(`API ${method} request failed:`, error);
      throw error;
    }
  }

  get<T>(url: string, options?: ApiOptions): Promise<T> {
    return this.request<T>(url, "GET", options);
  }

  post<T>(url: string, data: any, options?: ApiOptions): Promise<T> {
    return this.request<T>(url, "POST", { ...options, data });
  }

  put<T>(url: string, data: any, options?: ApiOptions): Promise<T> {
    return this.request<T>(url, "PUT", { ...options, data });
  }

  patch<T>(url: string, data: any, options?: ApiOptions): Promise<T> {
    return this.request<T>(url, "PATCH", { ...options, data });
  }

  delete<T>(url: string, options?: ApiOptions): Promise<T> {
    return this.request<T>(url, "DELETE", options);
  }
}

export const api = new ApiService();
