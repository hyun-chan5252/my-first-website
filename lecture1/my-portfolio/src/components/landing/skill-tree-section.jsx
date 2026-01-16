import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

/**
 * SkillTreeSection 컴포넌트
 *
 * Props:
 * 없음 - Skill Tree 섹션 표시 컴포넌트
 *
 * Example usage:
 * <SkillTreeSection />
 */
function SkillTreeSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-4xl mx-auto border-none shadow-none bg-transparent">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center">
              Skill Tree
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground md:text-lg">
              여기는 Skill Tree 섹션입니다. 기술 스택을 트리나 프로그레스바로 시각화할 예정입니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default SkillTreeSection;
