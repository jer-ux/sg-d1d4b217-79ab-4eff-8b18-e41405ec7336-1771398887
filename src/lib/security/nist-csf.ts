/**
 * NIST Cybersecurity Framework (CSF) Implementation
 * Core Functions: Identify, Protect, Detect, Respond, Recover
 */

export type NISTFunction = 'identify' | 'protect' | 'detect' | 'respond' | 'recover';

export type NISTCategory = {
  id: string;
  function: NISTFunction;
  name: string;
  description: string;
  subcategories: NISTSubcategory[];
};

export type NISTSubcategory = {
  id: string;
  name: string;
  description: string;
  implemented: boolean;
  status: 'compliant' | 'partial' | 'not-implemented' | 'not-applicable';
  evidence?: string[];
  lastAudit?: Date;
};

export type SecurityControl = {
  id: string;
  name: string;
  category: string;
  enabled: boolean;
  config: Record<string, unknown>;
};

/**
 * NIST CSF Core Functions and Categories
 */
export const NIST_CSF_FRAMEWORK: NISTCategory[] = [
  // IDENTIFY (ID)
  {
    id: 'ID.AM',
    function: 'identify',
    name: 'Asset Management',
    description: 'Data, personnel, devices, systems, and facilities are identified',
    subcategories: [
      {
        id: 'ID.AM-1',
        name: 'Physical devices and systems inventory',
        description: 'Physical devices and systems within the organization are inventoried',
        implemented: true,
        status: 'compliant',
        evidence: ['Infrastructure documentation', 'Cloud resource inventory']
      },
      {
        id: 'ID.AM-2',
        name: 'Software platforms and applications inventory',
        description: 'Software platforms and applications within the organization are inventoried',
        implemented: true,
        status: 'compliant',
        evidence: ['package.json', 'Dependencies tracked in version control']
      },
      {
        id: 'ID.AM-3',
        name: 'Organizational communication and data flows',
        description: 'Organizational communication and data flows are mapped',
        implemented: true,
        status: 'compliant',
        evidence: ['API documentation', 'Data flow diagrams']
      }
    ]
  },
  {
    id: 'ID.RA',
    function: 'identify',
    name: 'Risk Assessment',
    description: 'The organization understands cybersecurity risk',
    subcategories: [
      {
        id: 'ID.RA-1',
        name: 'Asset vulnerabilities identified',
        description: 'Asset vulnerabilities are identified and documented',
        implemented: true,
        status: 'compliant',
        evidence: ['Automated security scanning', 'Dependency vulnerability checks']
      },
      {
        id: 'ID.RA-2',
        name: 'Cyber threat intelligence',
        description: 'Cyber threat intelligence is received from information sharing forums',
        implemented: true,
        status: 'partial',
        evidence: ['GitHub security advisories', 'npm audit']
      }
    ]
  },
  
  // PROTECT (PR)
  {
    id: 'PR.AC',
    function: 'protect',
    name: 'Access Control',
    description: 'Access to physical and logical assets is limited',
    subcategories: [
      {
        id: 'PR.AC-1',
        name: 'Identities and credentials issued',
        description: 'Identities and credentials are issued, managed, verified, revoked',
        implemented: true,
        status: 'compliant',
        evidence: ['Supabase Authentication', 'JWT token management']
      },
      {
        id: 'PR.AC-3',
        name: 'Remote access managed',
        description: 'Remote access is managed',
        implemented: true,
        status: 'compliant',
        evidence: ['HTTPS enforcement', 'Secure API endpoints']
      },
      {
        id: 'PR.AC-4',
        name: 'Access permissions managed',
        description: 'Access permissions and authorizations are managed',
        implemented: true,
        status: 'compliant',
        evidence: ['RLS policies', 'Role-based access control']
      }
    ]
  },
  {
    id: 'PR.DS',
    function: 'protect',
    name: 'Data Security',
    description: 'Information and records are managed consistent with risk strategy',
    subcategories: [
      {
        id: 'PR.DS-1',
        name: 'Data-at-rest protected',
        description: 'Data-at-rest is protected',
        implemented: true,
        status: 'compliant',
        evidence: ['Database encryption', 'Supabase security features']
      },
      {
        id: 'PR.DS-2',
        name: 'Data-in-transit protected',
        description: 'Data-in-transit is protected',
        implemented: true,
        status: 'compliant',
        evidence: ['TLS/HTTPS', 'Secure WebSocket connections']
      },
      {
        id: 'PR.DS-5',
        name: 'Protections against data leaks',
        description: 'Protections against data leaks are implemented',
        implemented: true,
        status: 'compliant',
        evidence: ['Environment variables', 'Secure credential storage']
      }
    ]
  },
  {
    id: 'PR.PT',
    function: 'protect',
    name: 'Protective Technology',
    description: 'Technical security solutions are managed',
    subcategories: [
      {
        id: 'PR.PT-1',
        name: 'Audit/log records determined',
        description: 'Audit/log records are determined, documented, implemented',
        implemented: true,
        status: 'compliant',
        evidence: ['Security audit logging', 'Access logs']
      },
      {
        id: 'PR.PT-3',
        name: 'Principle of least functionality',
        description: 'The principle of least functionality is incorporated',
        implemented: true,
        status: 'compliant',
        evidence: ['Minimal dependencies', 'Security-first architecture']
      }
    ]
  },
  
  // DETECT (DE)
  {
    id: 'DE.AE',
    function: 'detect',
    name: 'Anomalies and Events',
    description: 'Anomalous activity is detected and impact understood',
    subcategories: [
      {
        id: 'DE.AE-1',
        name: 'Baseline network operations established',
        description: 'A baseline of network operations and expected data flows is established',
        implemented: true,
        status: 'partial',
        evidence: ['Application monitoring', 'Error tracking']
      },
      {
        id: 'DE.AE-3',
        name: 'Event data aggregated',
        description: 'Event data are collected and correlated from multiple sources',
        implemented: true,
        status: 'partial',
        evidence: ['Centralized logging', 'Audit trail system']
      }
    ]
  },
  {
    id: 'DE.CM',
    function: 'detect',
    name: 'Continuous Monitoring',
    description: 'The information system and assets are monitored',
    subcategories: [
      {
        id: 'DE.CM-1',
        name: 'Network monitored',
        description: 'The network is monitored to detect potential cybersecurity events',
        implemented: true,
        status: 'partial',
        evidence: ['Application performance monitoring', 'Error detection']
      },
      {
        id: 'DE.CM-7',
        name: 'Unauthorized activity monitored',
        description: 'Monitoring for unauthorized personnel, connections, devices',
        implemented: true,
        status: 'partial',
        evidence: ['Authentication logs', 'Access monitoring']
      }
    ]
  },
  
  // RESPOND (RS)
  {
    id: 'RS.RP',
    function: 'respond',
    name: 'Response Planning',
    description: 'Response processes and procedures are executed',
    subcategories: [
      {
        id: 'RS.RP-1',
        name: 'Response plan executed',
        description: 'Response plan is executed during or after an incident',
        implemented: true,
        status: 'partial',
        evidence: ['Incident response procedures', 'Security documentation']
      }
    ]
  },
  {
    id: 'RS.CO',
    function: 'respond',
    name: 'Communications',
    description: 'Response activities are coordinated',
    subcategories: [
      {
        id: 'RS.CO-2',
        name: 'Incidents reported',
        description: 'Incidents are reported consistent with established criteria',
        implemented: true,
        status: 'partial',
        evidence: ['Security incident logging', 'Alert system']
      }
    ]
  },
  
  // RECOVER (RC)
  {
    id: 'RC.RP',
    function: 'recover',
    name: 'Recovery Planning',
    description: 'Recovery processes and procedures are executed',
    subcategories: [
      {
        id: 'RC.RP-1',
        name: 'Recovery plan executed',
        description: 'Recovery plan is executed during or after a cybersecurity incident',
        implemented: true,
        status: 'partial',
        evidence: ['Backup procedures', 'Disaster recovery plan']
      }
    ]
  },
  {
    id: 'RC.IM',
    function: 'recover',
    name: 'Improvements',
    description: 'Recovery planning and processes are improved',
    subcategories: [
      {
        id: 'RC.IM-1',
        name: 'Lessons learned incorporated',
        description: 'Recovery plans incorporate lessons learned',
        implemented: true,
        status: 'partial',
        evidence: ['Post-incident reviews', 'Continuous improvement process']
      }
    ]
  }
];

/**
 * Calculate compliance score for a NIST function
 */
export function calculateFunctionScore(func: NISTFunction): number {
  const categories = NIST_CSF_FRAMEWORK.filter(cat => cat.function === func);
  let totalSubcategories = 0;
  let compliantSubcategories = 0;

  categories.forEach(category => {
    category.subcategories.forEach(sub => {
      totalSubcategories++;
      if (sub.status === 'compliant') {
        compliantSubcategories++;
      } else if (sub.status === 'partial') {
        compliantSubcategories += 0.5;
      }
    });
  });

  return totalSubcategories > 0 ? (compliantSubcategories / totalSubcategories) * 100 : 0;
}

/**
 * Calculate overall NIST CSF compliance score
 */
export function calculateOverallScore(): number {
  const functions: NISTFunction[] = ['identify', 'protect', 'detect', 'respond', 'recover'];
  const scores = functions.map(func => calculateFunctionScore(func));
  return scores.reduce((sum, score) => sum + score, 0) / scores.length;
}

/**
 * Get compliance summary
 */
export function getComplianceSummary() {
  const functions: NISTFunction[] = ['identify', 'protect', 'detect', 'respond', 'recover'];
  
  return {
    overall: calculateOverallScore(),
    byFunction: functions.map(func => ({
      function: func,
      score: calculateFunctionScore(func),
      categories: NIST_CSF_FRAMEWORK.filter(cat => cat.function === func).length
    })),
    totalCategories: NIST_CSF_FRAMEWORK.length,
    totalSubcategories: NIST_CSF_FRAMEWORK.reduce((sum, cat) => sum + cat.subcategories.length, 0),
    compliantSubcategories: NIST_CSF_FRAMEWORK.reduce((sum, cat) => 
      sum + cat.subcategories.filter(sub => sub.status === 'compliant').length, 0
    )
  };
}