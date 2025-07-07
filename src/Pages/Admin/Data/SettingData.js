import { toast } from 'react-toastify';
export async function getAllDrivers() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/drivers/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch drivers information');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }
  export async function editDriver(driver) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/drivers/edit/${driver.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driver),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(`Edit driver success!`, { containerId: "other" });
        return data;
      } else {
        toast.error(`Edit driver failed!`, { containerId: "other" });
      }
    } catch (error) {
      console.error("Error during order added", error);
      alert("An error occurred. Please try again later.");
    }
  }

  export async function insertDriver(driver) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/drivers/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(driver),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(`add driver success!`, { containerId: "other" });
        return data;
      } else {
        toast.error(`add driver failed!`, { containerId: "other" });
      }
    } catch (error) {
      console.error("Error during order added", error);
      alert("An error occurred. Please try again later.");
    }
  }


  export async function getAllCompanies() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/companies/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch companies information');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }
  export async function editCompany(company) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/companies/edit/${company.company_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(company),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(`Edit company success!`, { containerId: "other" });
        return data;
      } else {
        toast.error(`Edit company failed!`, { containerId: "other" });
      }
    } catch (error) {
      console.error("Error during order added", error);
      alert("An error occurred. Please try again later.");
    }
  }

  export async function insertCompany(company) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/companies/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(company),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(`add company success!`, { containerId: "other" });
        return data;
      } else {
        toast.error(`add company failed!`, { containerId: "other" });
      }
    } catch (error) {
      console.error("Error during order added", error);
      alert("An error occurred. Please try again later.");
    }
  }


  export async function getAllSuppliers() {
    let data;
    try {
        const response = await fetch(`http://localhost:8000/purchase/suppliers/all`);
        if (!response.ok) {
          throw new Error('Failed to fetch Suppliers information');
        }
        data = await response.json();
        
      } catch (error) {
        console.error('Error:', error);
      }
      return data;
  }
  export async function editSupplier(supplier) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/purchase/suppliers/edit/${supplier.supplier_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplier),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(`Edit Supplier success!`, { containerId: "other" });
        return data;
      } else {
        toast.error(`Edit Supplier failed!`, { containerId: "other" });
      }
    } catch (error) {
      console.error("Error during order added", error);
      alert("An error occurred. Please try again later.");
    }
  }

  export async function insertSupplier(supplier) {
    try {
      const response = await fetch(`http://127.0.0.1:8000/purchase/suppliers/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(supplier),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        toast.success(`add Suppliers success!`, { containerId: "other" });
        return data;
      } else {
        toast.error(`add Suppliers failed!`, { containerId: "other" });
      }
    } catch (error) {
      console.error("Error during order added", error);
      alert("An error occurred. Please try again later.");
    }
  }