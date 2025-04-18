import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! });

export async function POST(req: NextRequest) {
  const { hook } = await req.json();

  const system =
    'Du bist ein TikTok- und Social-Media-Viralitäts-Experte. ' +
    'Bewerte den folgenden Hook auf einer Skala von 1 bis 10 in vier Bereichen:\\n' +
    '- Virality\\n- Emotional Appeal\\n- Curiosity\\n- Storytelling Tension\\n' +
    'Dann gib eine kurze Gesamtbewertung (1 Satz) ab.\\n' +
    'Schlage anschließend drei bessere Alternativen für diesen Hook vor, die viral stärker performen könnten.';

  try {
    const chat = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: system },
        { role: 'user', content: `Hook: ${hook}` },
      ],
      temperature: 0.9,
    });

    const result = chat.choices[0].message.content;
    return NextResponse.json({ result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ result: 'Fehler bei der GPT-Verarbeitung.' }, { status: 500 });
  }
}
