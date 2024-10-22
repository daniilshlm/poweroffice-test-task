import React, { useState } from 'react';
import { Company } from '@/types/company';
import { Card } from '@rewind-ui/core';
import { useTheme } from '@/utils/useTheme';

interface CompanyListProps {
  companies: Company[];
}

const CompanyList = ({ companies }: CompanyListProps): JSX.Element => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const { theme } = useTheme();

  const handleToggle = (orgNumber: string): void => {
    setExpanded(expanded === orgNumber ? null : orgNumber);
  };

  return (
    <div className={`company-list ${theme}`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {companies.length > 0 ? (
          companies.map((company) => (
            <Card
              key={company.organisasjonsnummer}
              className={`company-card ${expanded === company.organisasjonsnummer ? 'active' : ''} p-4 shadow-lg rounded-lg`}
              onClick={() => handleToggle(company.organisasjonsnummer)}
              style={{ cursor: 'pointer', transition: 'all 0.3s ease' }}
            >
              <h3 className="text-lg font-bold">{company.navn}</h3>
              <p className="text-sm">Org Number: {company.organisasjonsnummer}</p>
              {expanded === company.organisasjonsnummer && (
                <div className="company-details mt-2">
                  <p>Address: {company.forretningsadresse?.adresse || 'N/A'}</p>
                  <p>Founded: {company.stiftelsesdato || 'N/A'}</p>
                  <p></p>
                </div>
              )}
            </Card>
          ))
        ) : (
          <p className="text-center col-span-full">No companies found</p>
        )}
      </div>
    </div>
  );
};

export default CompanyList;
