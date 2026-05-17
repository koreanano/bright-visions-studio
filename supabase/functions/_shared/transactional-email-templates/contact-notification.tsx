import * as React from 'npm:react@18.3.1'
import {
  Body, Container, Head, Heading, Hr, Html, Preview, Section, Text,
} from 'npm:@react-email/components@0.0.22'
import type { TemplateEntry } from './registry.ts'

interface ContactNotificationProps {
  company?: string
  name?: string
  email?: string
  phone?: string
  category?: string
  message?: string
}

const ContactNotificationEmail = ({
  company = '-',
  name = '-',
  email = '-',
  phone = '-',
  category = '-',
  message = '-',
}: ContactNotificationProps) => (
  <Html lang="ko" dir="ltr">
    <Head />
    <Preview>{`새 문의: ${company} / ${name}`}</Preview>
    <Body style={main}>
      <Container style={container}>
        <Heading style={h1}>새로운 제품 문의가 접수되었습니다</Heading>
        <Text style={text}>NANOKOREA 홈페이지 문의 폼을 통해 다음 내용이 접수되었습니다.</Text>
        <Section style={card}>
          <Row label="회사명" value={company} />
          <Row label="담당자" value={name} />
          <Row label="이메일" value={email} />
          <Row label="연락처" value={phone || '-'} />
          <Row label="관심 카테고리" value={category || '-'} />
        </Section>
        <Heading style={h2}>문의 내용</Heading>
        <Text style={messageBox}>{message}</Text>
        <Hr style={hr} />
        <Text style={footer}>회신은 위 담당자 이메일로 직접 보내실 수 있습니다.</Text>
      </Container>
    </Body>
  </Html>
)

const Row = ({ label, value }: { label: string; value: string }) => (
  <Text style={rowText}>
    <span style={rowLabel}>{label}</span>
    <span style={rowValue}>{value}</span>
  </Text>
)

export const template = {
  component: ContactNotificationEmail,
  subject: (d: Record<string, any>) =>
    `[NANOKOREA 문의] ${d.company || ''} - ${d.name || ''}`,
  to: 'cscomm@naver.com',
  displayName: '문의 접수 알림',
  previewData: {
    company: '샘플(주)',
    name: '홍길동',
    email: 'hong@example.com',
    phone: '010-1234-5678',
    category: '첨단세라믹',
    message: '제품 카탈로그와 견적을 부탁드립니다.',
  },
} satisfies TemplateEntry

const main = { backgroundColor: '#ffffff', fontFamily: 'Arial, sans-serif' }
const container = { padding: '24px', maxWidth: '600px' }
const h1 = { fontSize: '22px', fontWeight: 'bold', color: '#071121', margin: '0 0 12px' }
const h2 = { fontSize: '16px', fontWeight: 'bold', color: '#071121', margin: '24px 0 8px' }
const text = { fontSize: '14px', color: '#444', lineHeight: '1.5', margin: '0 0 16px' }
const card = { backgroundColor: '#f6f7f9', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px 20px', margin: '8px 0 16px' }
const rowText = { fontSize: '14px', margin: '6px 0', color: '#071121' }
const rowLabel = { display: 'inline-block', width: '110px', color: '#6b7280', fontWeight: 600 }
const rowValue = { color: '#071121' }
const messageBox = { fontSize: '14px', color: '#071121', whiteSpace: 'pre-wrap' as const, backgroundColor: '#f6f7f9', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '14px 16px' }
const hr = { borderColor: '#e5e7eb', margin: '24px 0 12px' }
const footer = { fontSize: '12px', color: '#9ca3af', margin: 0 }
