import { Router } from 'express';
import { AccountsRolesService } from '../services/AccountsRoles';

const router = Router();
const accountsRolesService = new AccountsRolesService();

// Buscar todos os roles
router.get('/account-roles', async (req, res) => {
  try {
    const roles = await accountsRolesService.getAllRoles();
    res.json({ roles, message: 'Roles fetched successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching roles', error: error instanceof Error ? error.message : error });
  }
});

// Buscar role por UUID
router.get('/account-roles/:uuid', async (req, res) => {
  try {
    const role = await accountsRolesService.getRoleByUuid(req.params.uuid);
    res.json({ role, message: 'Role fetched successfully!' });
  } catch (error) {
    if (error instanceof Error && error.message === 'Role not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching role', error: error instanceof Error ? error.message : error });
    }
  }
});

// Buscar role por nome
router.get('/account-roles/name/:roleName', async (req, res) => {
  try {
    const role = await accountsRolesService.getRoleByName(req.params.roleName);
    res.json({ role, message: 'Role fetched successfully!' });
  } catch (error) {
    if (error instanceof Error && error.message === 'Role not found') {
      res.status(404).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error fetching role', error: error instanceof Error ? error.message : error });
    }
  }
});

// Criar novo role
router.post('/account-roles', async (req, res) => {
  try {
    const newRole = await accountsRolesService.createRole(req.body);
    res.status(201).json({ role: newRole, message: 'Role created successfully!' });
  } catch (error) {
    if (error instanceof Error && error.message === 'Role with this name already exists') {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error creating role', error: error instanceof Error ? error.message : error });
    }
  }
});

// Atualizar role
router.put('/account-roles/:uuid', async (req, res) => {
  try {
    const updated = await accountsRolesService.updateRole(req.params.uuid, req.body);
    res.json({ role: updated, message: 'Role updated successfully!' });
  } catch (error) {
    if (error instanceof Error && error.message === 'Role not found') {
      res.status(404).json({ message: error.message });
    } else if (error instanceof Error && error.message === 'Role with this name already exists') {
      res.status(409).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error updating role', error: error instanceof Error ? error.message : error });
    }
  }
});

// Deletar role
router.delete('/account-roles/:uuid', async (req, res) => {
  try {
    const deleted = await accountsRolesService.deleteRole(req.params.uuid);
    res.json({ deleted, message: 'Role deleted successfully!' });
  } catch (error) {
    if (error instanceof Error && error.message === 'Role not found') {
      res.status(404).json({ message: error.message });
    } else if (error instanceof Error && error.message === 'Cannot delete role with associated accounts') {
      res.status(400).json({ message: error.message });
    } else {
      res.status(500).json({ message: 'Error deleting role', error: error instanceof Error ? error.message : error });
    }
  }
});

export default router;
