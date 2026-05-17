import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(request: Request) {
  try {
    const goals = await prisma.goal.findMany({
      include: {
        employee: true,
      },
    });
    return NextResponse.json(goals);
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch goals' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const goals = body.goals || [];
    const status = body.status || 'DRAFT';

    if (!Array.isArray(goals) || goals.length === 0) {
      return NextResponse.json({ error: 'No goals provided' }, { status: 400 });
    }

    // System-enforced validation rules
    if (status === 'SUBMITTED') {
      if (goals.length > 8) {
        return NextResponse.json({ error: 'Maximum 8 goals allowed' }, { status: 400 });
      }

      const totalWeightage = goals.reduce((sum, g) => sum + (g.weightage || 0), 0);
      if (totalWeightage !== 100) {
        return NextResponse.json({ error: 'Total weightage must equal exactly 100%' }, { status: 400 });
      }

      const hasInvalidWeightage = goals.some((g) => (g.weightage || 0) < 10);
      if (hasInvalidWeightage) {
        return NextResponse.json({ error: 'Minimum weightage per individual goal is 10%' }, { status: 400 });
      }
    }

    // Process and save goals to DB
    const savedGoals = [];
    for (const g of goals) {
      let progress = 0;
      if (g.measurementType === 'ZERO_BASED') {
        progress = g.target === 0 ? 100 : 0;
      }

      const goal = await prisma.goal.create({
        data: {
          title: g.title,
          description: g.description,
          thrustArea: g.thrustArea,
          measurementType: g.measurementType,
          target: g.target,
          weightage: g.weightage,
          progress,
          status: status,
          // Assuming employeeId is fetched from session in a real app
          employeeId: "temp-employee-id", 
        },
      });
      savedGoals.push(goal);
    }
    
    return NextResponse.json(savedGoals, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to create goal' }, { status: 500 });
  }
}
