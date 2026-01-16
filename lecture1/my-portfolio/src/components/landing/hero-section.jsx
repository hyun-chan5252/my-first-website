import * as React from 'react';
import { Card, CardContent } from '../ui/card';

/**
 * HeroSection 컴포넌트
 *
 * Props:
 * 없음 - Hero 영역 표시 컴포넌트
 *
 * Example usage:
 * <HeroSection />
 */
function HeroSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-background to-muted">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="border-none shadow-none bg-transparent">
          <CardContent className="flex flex-col items-center justify-center space-y-4 text-center p-6">
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Hero Section
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                여기는 Hero 섹션입니다. 메인 비주얼, 이름, 간단 소개가 들어갈 예정입니다.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default HeroSection;
