import { Page, Text, View, Document, StyleSheet } from '@react-pdf/renderer';
import type { ResumeData } from '../../../types';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontFamily: 'Helvetica',
        color: '#333',
    },
    header: {
        marginBottom: 30,
    },
    name: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#2563eb', // Blue-600
        marginBottom: 5,
    },
    contact: {
        fontSize: 10,
        color: '#666',
        marginBottom: 10,
    },
    summary: {
        fontSize: 11,
        lineHeight: 1.5,
        color: '#444',
        borderLeft: '3px solid #2563eb',
        paddingLeft: 10,
    },
    sectionTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2563eb',
        marginTop: 20,
        marginBottom: 10,
    },
    item: {
        marginBottom: 15,
    },
    itemHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 2,
    },
    title: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 11,
        fontStyle: 'italic',
        color: '#555',
    },
    date: {
        fontSize: 10,
        color: '#888',
    },
    description: {
        fontSize: 10,
        lineHeight: 1.5,
        marginTop: 3,
        textAlign: 'justify',
    },
    skillsGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 8,
    },
    skill: {
        fontSize: 10,
        backgroundColor: '#eff6ff', // Blue-50
        color: '#1e40af', // Blue-800
        padding: '4 8',
        borderRadius: 4,
    },
});

interface TemplateProps {
    data: ResumeData;
}

export const CleanTemplate = ({ data }: TemplateProps) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.header}>
                <Text style={styles.name}>{data.personalInfo.fullName}</Text>
                <Text style={styles.contact}>
                    {data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.cityState}
                </Text>
                {data.personalInfo.summary && (
                    <Text style={styles.summary}>{data.personalInfo.summary}</Text>
                )}
            </View>

            <Text style={styles.sectionTitle}>Experiência</Text>
            {data.experiences.map((exp, i) => (
                <View key={i} style={styles.item}>
                    <View style={styles.itemHeader}>
                        <Text style={styles.title}>{exp.role}</Text>
                        <Text style={styles.date}>{exp.startDate} - {exp.endDate}</Text>
                    </View>
                    <Text style={styles.subtitle}>{exp.company}</Text>
                    <Text style={styles.description}>{exp.description}</Text>
                </View>
            ))}

            <Text style={styles.sectionTitle}>Formação</Text>
            {data.education.map((edu, i) => (
                <View key={i} style={styles.item}>
                    <View style={styles.itemHeader}>
                        <Text style={styles.title}>{edu.course}</Text>
                        <Text style={styles.date}>{edu.startDate} - {edu.endDate}</Text>
                    </View>
                    <Text style={styles.subtitle}>{edu.institution}</Text>
                </View>
            ))}

            <Text style={styles.sectionTitle}>Habilidades</Text>
            <View style={styles.skillsGrid}>
                {data.skills.map((skill, i) => (
                    <Text key={i} style={styles.skill}>{skill.name}</Text>
                ))}
            </View>
        </Page>
    </Document>
);
