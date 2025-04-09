'use server';

import prisma from '@/lib/prisma';

// READ actions
export const getUsers = async () => {
  try {
    const users = await prisma.user.findMany({
      include: {
        posts: true,
        _count: {
          select: { comments: true, posts: true }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    });
    
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to fetch users');
  }
}

export const getUserById = async (id) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: {
        posts: {
          orderBy: {
            createdAt: 'desc'
          }
        },
        comments: {
          orderBy: {
            createdAt: 'desc'
          },
          take: 10
        },
        _count: {
          select: { comments: true, posts: true }
        },
      }
    });
    
    if (!user) {
      throw new Error('User not found');
    }
    
    return user;
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error);
    throw error;
  }
}

export const getAnimals = async () => {
  try {
    const animals = await prisma.animal.findMany();
    return animals;
  } catch (error) {
    console.error('Error fetching animals:', error);
    return [];
  }
}

export const getExhibits = async () => {
    try {
      const exhibits = await prisma.exhibit.findMany();
      return exhibits;
    } catch (error) {
      console.error('Error fetching exhibits:', error);
      return [];
    }
  }

// CREATE actions
export const createUser = async ({ email, name }) => {
  if (!email) {
    throw new Error('Email is required');
  }
  
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    
    revalidatePath('/');
    
    return user;
  } catch (error) {
    if (error.code === 'P2002') {
      throw new Error('A user with this email already exists');
    }
    
    throw new Error('Failed to create user');
  }
}

export const createAnimal = async ({ name, scientificName, exhibit, location, funFact }) => {
  if (!name) {
    throw new Error('Name is required');
  }
  
  try {
    const animal = await prisma.animal.create({
      data: {
        name,
        scientificName,
        exhibit,
        location,
        funFact
      },
    });
    
    return animal;
  } catch (error) {
    console.error('Error creating animal:', error);
    throw error;
  }
}

export const createExhibit = async ({ exhibitName, description }) => {
    if (!exhibitName) {
        throw new Error('Name is required');
      }

    try {
      const exhibit = await prisma.exhibit.create({
        data: {
          exhibitName,
          description
        },
      });
      
      return exhibit;
    } catch (error) {
      console.error('Error creating exhibit:', error);
      throw error;
    }
  }

// Search functions
export const getAnimalsByName = async (search) => {
    try {
      const animals = await prisma.animal.findMany({
        where: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
        },
      });
      return animals;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  };

export const getExhibitsByName = async (search) => {
  try {
    const exhibits = await prisma.exhibit.findMany({
      where: {
        exhibitName: {
          contains: search,
          mode: 'insensitive',
        },
      },
    });
    return exhibits;
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};
  