// Authentication utility functions
export const getUserRole = () => {
  return localStorage.getItem("userRole") || "guest";
};

export const isAuthenticated = () => {
  return !!localStorage.getItem("token");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("currentUser");
  return user ? JSON.parse(user) : null;
};

export const setCurrentUser = (userData) => {
  localStorage.setItem("currentUser", JSON.stringify(userData));
  localStorage.setItem("userRole", userData.role || "user");
  localStorage.setItem("token", userData.token || "dummy-token");
};

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  localStorage.removeItem("currentUser");
};

export const isDeveloper = () => {
  const user = getCurrentUser();
  return user?.role === 'developer' || user?.role === 'owner';
};

export const isAdmin = () => {
  const user = getCurrentUser();
  return user?.role === 'admin' || isDeveloper();
};

// Mock user data for demonstration
export const mockUsers = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "owner@crystalbeauty.com",
    role: "owner",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b94c?w=150&h=150&fit=crop",
    phone: "+1 (555) 123-4567",
    address: "123 Beauty Lane, Beverly Hills, CA 90210",
    joinDate: "2023-01-15"
  },
  {
    id: 2,
    name: "Alex Developer",
    email: "dev@crystalbeauty.com",
    role: "developer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
    phone: "+1 (555) 987-6543",
    address: "456 Tech Street, San Francisco, CA 94105",
    joinDate: "2023-02-01"
  },
  {
    id: 3,
    name: "Emily Admin",
    email: "admin@crystalbeauty.com",
    role: "admin",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
    phone: "+1 (555) 555-0123",
    address: "789 Admin Ave, New York, NY 10001",
    joinDate: "2023-03-10"
  },
  {
    id: 4,
    name: "John Customer",
    email: "customer@example.com",
    role: "user",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop",
    phone: "+1 (555) 111-2222",
    address: "321 Customer St, Los Angeles, CA 90001",
    joinDate: "2023-06-15"
  }
];

export const authenticateUser = (email, password) => {
  // Mock authentication - find user by email
  const user = mockUsers.find(u => u.email === email);
  
  if (user && password === "password123") { // Simple mock password
    const authData = {
      ...user,
      token: `token_${user.id}_${Date.now()}`
    };
    setCurrentUser(authData);
    return { success: true, user: authData };
  }
  
  return { success: false, error: "Invalid credentials" };
};

export const updateUserProfile = (userId, updates) => {
  const currentUser = getCurrentUser();
  if (currentUser && currentUser.id === userId) {
    const updatedUser = { ...currentUser, ...updates };
    setCurrentUser(updatedUser);
    return { success: true, user: updatedUser };
  }
  return { success: false, error: "Unauthorized" };
};
