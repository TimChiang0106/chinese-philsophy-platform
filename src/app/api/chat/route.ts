import { NextResponse } from "next/server";

export async function POST(req: Request) {
    const { message } = await req.json();

    // Mock response logic - in a real app this would call an LLM API
    const mockResponses = [
        "The Master said: 'To know what you know and what you do not know, that is true knowledge.'",
        "It does not matter how slowly you go as long as you do not stop.",
        "Everything has beauty, but not everyone sees it.",
        "Wheresoever you go, go with all your heart.",
        "Respect yourself and others will respect you.",
        "Study the past if you would define the future.",
        "Learning without thought is labor lost; thought without learning is perilous."
    ];

    // Simulating network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const randomResponse = mockResponses[Math.floor(Math.random() * mockResponses.length)];

    return NextResponse.json({
        response: `(Mock AI): ${randomResponse}`
    });
}
