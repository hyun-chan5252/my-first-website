import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

/**
 * ProjectsSection 컴포넌트
 *
 * Props:
 * 없음 - Projects 섹션 표시 컴포넌트
 *
 * Example usage:
 * <ProjectsSection />
 */
function ProjectsSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-4xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center">
              Projects
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground md:text-lg">
              여기는 Projects 섹션입니다. 대표작 썸네일 3-4개와 &apos;더 보기&apos; 버튼이 들어갈 예정입니다.
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild variant="outline">
              <Link to="/projects">더 보기</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

export default ProjectsSection;
