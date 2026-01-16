import * as React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

/**
 * ContactSection 컴포넌트
 *
 * Props:
 * 없음 - Contact 섹션 표시 컴포넌트
 *
 * Example usage:
 * <ContactSection />
 */
function ContactSection() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
      <div className="container mx-auto px-4 md:px-6">
        <Card className="max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl text-center">
              Contact
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-muted-foreground md:text-lg">
              여기는 Contact 섹션입니다. 연락처, SNS, 간단한 메시지 폼이 들어갈 예정입니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default ContactSection;
