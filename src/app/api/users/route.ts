import { NextRequest, NextResponse } from 'next/server';

// Sample data
const users = [
  { id: 1, name: 'John Doe', email: 'john@example.com', age: 30 },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', age: 25 },
  { id: 3, name: 'Bob Johnson', email: 'bob@example.com', age: 35 },
];

// GET /api/users
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const limit = searchParams.get('limit');
  const search = searchParams.get('search');

  let filteredUsers = users;

  // Filter by search term
  if (search) {
    filteredUsers = users.filter(user => 
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase())
    );
  }

  // Limit results
  if (limit) {
    filteredUsers = filteredUsers.slice(0, parseInt(limit));
  }

  return NextResponse.json({
    users: filteredUsers,
    total: filteredUsers.length,
    timestamp: new Date().toISOString(),
  });
}

// POST /api/users
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, age } = body;

    // Basic validation
    if (!name || !email || !age) {
      return NextResponse.json(
        { error: 'Name, email, and age are required' },
        { status: 400 }
      );
    }

    // Create new user
    const newUser = {
      id: users.length + 1,
      name,
      email,
      age: parseInt(age),
    };

    users.push(newUser);

    return NextResponse.json(
      { 
        message: 'User created successfully',
        user: newUser 
      },
      { status: 201 }
    );
  } catch {
    return NextResponse.json(
      { error: 'Invalid JSON data' },
      { status: 400 }
    );
  }
}

// PUT /api/users (update all users - for demo purposes)
export async function PUT(request: NextRequest) {
  try {
    await request.json();
    // In a real app, you'd update specific users
    
    return NextResponse.json({
      message: 'Users updated successfully',
      updatedCount: users.length,
    });
  } catch {
    return NextResponse.json(
      { error: 'Invalid request' },
      { status: 400 }
    );
  }
}

// DELETE /api/users (clear all users - for demo purposes)
export async function DELETE() {
  const deletedCount = users.length;
  users.length = 0; // Clear array
  
  return NextResponse.json({
    message: 'All users deleted',
    deletedCount,
  });
}