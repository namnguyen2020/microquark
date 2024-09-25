import React, { useState, useEffect } from 'react';
import { Translate } from 'react-jhipster';
import { Table, Badge, Col, Row, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useAppDispatch, useAppSelector } from 'app/config/store';
import { getSystemHealth } from '../administration.reducer';

export const HealthPage = () => {
  const [healthObject, setHealthObject] = useState({});
  const dispatch = useAppDispatch();

  const health = useAppSelector(state => state.administration.health);
  const isFetching = useAppSelector(state => state.administration.loading);

  useEffect(() => {
    dispatch(getSystemHealth());
  }, []);

  const fetchSystemHealth = () => {
    if (!isFetching) {
      dispatch(getSystemHealth());
    }
  };

  const data = health?.checks || [];

  return (
    <div>
      <h2 id="health-page-heading" data-cy="healthPageHeading">
        Health Checks
      </h2>
      <p>
        <Button onClick={fetchSystemHealth} color={isFetching ? 'btn btn-danger' : 'btn btn-primary'} disabled={isFetching}>
          <FontAwesomeIcon icon="sync" />
          &nbsp;
          <Translate component="span" contentKey="health.refresh.button">
            Refresh
          </Translate>
        </Button>
      </p>
      <Row>
        <Col md="12">
          <Table bordered aria-describedby="health-page-heading">
            <thead>
              <tr>
                <th>Service Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map(({ name, status }, index) => (
                <tr key={index}>
                  <td>{name}</td>
                  <td>
                    <Badge color={status !== 'UP' ? 'danger' : 'success'}>{status}</Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default HealthPage;
