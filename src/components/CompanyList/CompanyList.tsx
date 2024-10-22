import React from 'react';
import { Company } from '@/types/company';

interface CompanyListProps {
  companies: Company[];
}

const CompanyList = ({ companies }: CompanyListProps): JSX.Element => {
  return (
    <div>
      {companies.length > 0 ? (
        companies.map((company) => (
          <div key={company.organisasjonsnummer}>
            <h3>{company.navn}</h3>
            <p>Org Number: {company.organisasjonsnummer}</p>
          </div>
        ))
      ) : (
        <p>No companies found</p>
      )}
    </div>
  );
};

export default CompanyList;
