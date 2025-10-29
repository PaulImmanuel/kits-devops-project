// File: terraform/main.tf

terraform {
  required_providers {
    azurerm = {
      source  = "hashicorp/azurerm"
      version = "~>3.0"
    }
  }
}

provider "azurerm" {
  features {}
}

# 1. Resource Group
resource "azurerm_resource_group" "rg" {
  name     = "devops-project-rg"
  location = "East US" // Good default for student accounts
}

# 2. Azure Container Registry (ACR) [cite: 87]
resource "azurerm_container_registry" "acr" {
  name                = "kitsdevopsacr${random_id.id.hex}" // Creates a unique name
  resource_group_name = azurerm_resource_group.rg.name
  location            = azurerm_resource_group.rg.location
  sku                 = "Basic"
  admin_enabled       = true // Needed for CI/CD pipeline
}

# 3. Azure Kubernetes Service (AKS) [cite: 88]
resource "azurerm_kubernetes_cluster" "aks" {
  name                = "devops-project-aks"
  location            = azurerm_resource_group.rg.location
  resource_group_name = azurerm_resource_group.rg.name
  dns_prefix          = "kits-devops-dns"

  default_node_pool {
    name       = "default"
    node_count = 1 // Keep costs low
    vm_size    = "Standard_B2s" // Low-cost, burstable VM
  }

  identity {
    type = "SystemAssigned"
  }

  # Grant the AKS cluster (via its identity) pull access from ACR
  # This is a best practice.
  role_based_access_control_enabled = true
}

# Give AKS permission to pull from ACR
resource "azurerm_role_assignment" "aks_pull_acr" {
  scope                = azurerm_container_registry.acr.id
  role_definition_name = "AcrPull"
  principal_id         = azurerm_kubernetes_cluster.aks.identity[0].principal_id
}


# Random ID to ensure ACR name is unique
resource "random_id" "id" {
  byte_length = 6
}

# --- Outputs ---
# We output these values to use in our CI/CD pipeline
output "resource_group_name" {
  value = azurerm_resource_group.rg.name
}
output "aks_cluster_name" {
  value = azurerm_kubernetes_cluster.aks.name
}
output "acr_login_server" {
  value = azurerm_container_registry.acr.login_server
}
output "acr_name" {
  value = azurerm_container_registry.acr.name
}