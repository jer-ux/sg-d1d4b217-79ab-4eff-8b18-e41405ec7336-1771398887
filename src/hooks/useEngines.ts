/**
 * React Hooks for AIOS Computation Engines
 * Provides type-safe, cached access to Economic, Statistical, and Simulation engines
 */

import { useState, useCallback } from "react";
import { getEngineClient } from "@/lib/engines/sdk";
import type {
  CostAttributionRequest,
  CostAttributionResponse,
  ROIRequest,
  ROIResponse,
  DistributionFitRequest,
  DistributionFitResponse,
  RegressionRequest,
  RegressionResponse,
  MonteCarloRequest,
  MonteCarloResponse,
  EngineResponse,
} from "@/lib/engines/sdk";

interface UseEngineState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  executionTime: number | null;
}

/**
 * Economic Engine Hook
 */
export function useEconomicEngine() {
  const [costState, setCostState] = useState<UseEngineState<CostAttributionResponse>>({
    data: null,
    loading: false,
    error: null,
    executionTime: null,
  });

  const [roiState, setRoiState] = useState<UseEngineState<ROIResponse>>({
    data: null,
    loading: false,
    error: null,
    executionTime: null,
  });

  const attributeCost = useCallback(async (request: CostAttributionRequest) => {
    setCostState({ data: null, loading: true, error: null, executionTime: null });
    try {
      const client = getEngineClient();
      const response = await client.attributeCost(request);
      setCostState({
        data: response.result,
        loading: false,
        error: null,
        executionTime: response.execution_time_ms,
      });
      return response.result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Engine execution failed";
      setCostState({ data: null, loading: false, error: errorMsg, executionTime: null });
      throw error;
    }
  }, []);

  const calculateROI = useCallback(async (request: ROIRequest) => {
    setRoiState({ data: null, loading: true, error: null, executionTime: null });
    try {
      const client = getEngineClient();
      const response = await client.calculateROI(request);
      setRoiState({
        data: response.result,
        loading: false,
        error: null,
        executionTime: response.execution_time_ms,
      });
      return response.result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Engine execution failed";
      setRoiState({ data: null, loading: false, error: errorMsg, executionTime: null });
      throw error;
    }
  }, []);

  return {
    attributeCost: {
      execute: attributeCost,
      ...costState,
    },
    calculateROI: {
      execute: calculateROI,
      ...roiState,
    },
  };
}

/**
 * Statistical Engine Hook
 */
export function useStatisticalEngine() {
  const [distributionState, setDistributionState] = useState<UseEngineState<DistributionFitResponse>>({
    data: null,
    loading: false,
    error: null,
    executionTime: null,
  });

  const [regressionState, setRegressionState] = useState<UseEngineState<RegressionResponse>>({
    data: null,
    loading: false,
    error: null,
    executionTime: null,
  });

  const fitDistribution = useCallback(async (request: DistributionFitRequest) => {
    setDistributionState({ data: null, loading: true, error: null, executionTime: null });
    try {
      const client = getEngineClient();
      const response = await client.fitDistribution(request);
      setDistributionState({
        data: response.result,
        loading: false,
        error: null,
        executionTime: response.execution_time_ms,
      });
      return response.result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Engine execution failed";
      setDistributionState({ data: null, loading: false, error: errorMsg, executionTime: null });
      throw error;
    }
  }, []);

  const runRegression = useCallback(async (request: RegressionRequest) => {
    setRegressionState({ data: null, loading: true, error: null, executionTime: null });
    try {
      const client = getEngineClient();
      const response = await client.runRegression(request);
      setRegressionState({
        data: response.result,
        loading: false,
        error: null,
        executionTime: response.execution_time_ms,
      });
      return response.result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Engine execution failed";
      setRegressionState({ data: null, loading: false, error: errorMsg, executionTime: null });
      throw error;
    }
  }, []);

  return {
    fitDistribution: {
      execute: fitDistribution,
      ...distributionState,
    },
    runRegression: {
      execute: runRegression,
      ...regressionState,
    },
  };
}

/**
 * Simulation Engine Hook
 */
export function useSimulationEngine() {
  const [monteCarloState, setMonteCarloState] = useState<UseEngineState<MonteCarloResponse>>({
    data: null,
    loading: false,
    error: null,
    executionTime: null,
  });

  const runMonteCarlo = useCallback(async (request: MonteCarloRequest) => {
    setMonteCarloState({ data: null, loading: true, error: null, executionTime: null });
    try {
      const client = getEngineClient();
      const response = await client.runMonteCarlo(request);
      setMonteCarloState({
        data: response.result,
        loading: false,
        error: null,
        executionTime: response.execution_time_ms,
      });
      return response.result;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Engine execution failed";
      setMonteCarloState({ data: null, loading: false, error: errorMsg, executionTime: null });
      throw error;
    }
  }, []);

  return {
    monteCarlo: {
      execute: runMonteCarlo,
      ...monteCarloState,
    },
  };
}

/**
 * Engine Status Hook
 */
export function useEngineStatus() {
  const [status, setStatus] = useState<{
    data: any | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: false,
    error: null,
  });

  const checkStatus = useCallback(async () => {
    setStatus({ data: null, loading: true, error: null });
    try {
      const client = getEngineClient();
      const response = await client.checkStatus();
      setStatus({ data: response, loading: false, error: null });
      return response;
    } catch (error) {
      const errorMsg = error instanceof Error ? error.message : "Status check failed";
      setStatus({ data: null, loading: false, error: errorMsg });
      throw error;
    }
  }, []);

  return {
    checkStatus,
    ...status,
  };
}