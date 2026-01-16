import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';

/**
 * ProjectsPage 컴포넌트
 *
 * Props:
 * 없음 - Projects 페이지 컴포넌트
 *
 * Example usage:
 * <ProjectsPage />
 */
function ProjectsPage() {
  return (
    <main className="flex-1">
      <section className="w-full py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 md:px-6">
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle className="text-3xl md:text-4xl text-center">
                Projects
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground md:text-lg leading-relaxed">
                Projects 페이지가 개발될 공간입니다. 포트폴리오 작품들이 들어갈 예정입니다.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </main>
  );
}

export default ProjectsPage;
