import * as React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';

/**
 * AboutMeSection 컴포넌트
 *
 * Props:
 * 없음 - About Me 섹션 표시 컴포넌트
 *
 * Example usage:
 * <AboutMeSection />
 */
function AboutMeSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center">
              About Me
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground md:text-lg">
              여기는 About Me 섹션입니다. 간단한 자기소개와 &apos;더 알아보기&apos; 버튼이 들어갈 예정입니다.
            </p>
          </CardContent>
          <CardFooter className="justify-center">
            <Button asChild>
              <Link to="/about">더 알아보기</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

export default AboutMeSection;
