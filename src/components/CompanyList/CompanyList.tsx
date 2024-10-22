import React, { useState } from 'react';
import { Company } from '@/types/company';
import { Card } from '@rewind-ui/core';

interface CompanyListProps {
  companies: Company[];
}

const CompanyList = ({ companies }: CompanyListProps): JSX.Element => {
  const [expanded, setExpanded] = useState<string | null>(null);

  const handleToggle = (orgNumber: string): void => {
    setExpanded(expanded === orgNumber ? null : orgNumber);
  };

  return (
    <div className="company-list">
      {companies.length > 0 ? (
        companies.map((company) => (
          <Card
            key={company.organisasjonsnummer}
            className={`company-card ${expanded === company.organisasjonsnummer ? 'active' : ''}`}
            onClick={() => handleToggle(company.organisasjonsnummer)}
          >
            <h3>{company.navn}</h3>
            <p>Org Number: {company.organisasjonsnummer}</p>
            {expanded === company.organisasjonsnummer && (
              <div className="company-details">
                <p>Address: {company.forretningsadresse?.adresse || 'N/A'}</p>
                <p>Founded: {company.stiftelsesdato || 'N/A'}</p>
              </div>
            )}
          </Card>
        ))
      ) : (
        <p>No companies found</p>
      )}
    </div>
  );
};

export default CompanyList;
