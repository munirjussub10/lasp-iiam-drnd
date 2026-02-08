import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import type { SoilAnalysisData } from './soil-analysis-form';
import type { PlantAnalysisData } from './plant-analysis-form';

interface NutrientChartProps {
  data: SoilAnalysisData | PlantAnalysisData;
}

export function NutrientChart({ data }: NutrientChartProps) {
  // Verificar se é análise de solo ou planta
  const isSoilAnalysis = 'soilTexture' in data;
  
  const getNutrientLevel = (value: number, limits: number[]): number => {
    if (value < limits[0]) return 1; // Muito Baixo
    if (value < limits[1]) return 2; // Baixo
    if (value < limits[2]) return 3; // Médio
    if (value <= limits[3]) return 4; // Bom
    return 5; // Muito Bom
  };

  const getColor = (level: number): string => {
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6'];
    return colors[level - 1];
  };

  let chartData: any[] = [];
  let microData: any[] = [];

  if (isSoilAnalysis) {
    const soilData = data as SoilAnalysisData;
    chartData = [
      {
        name: 'P',
        value: parseFloat(soilData.phosphorus) || 0,
        level: getNutrientLevel(parseFloat(soilData.phosphorus) || 0, [4, 8, 12, 20]),
      },
      {
        name: 'K',
        value: parseFloat(soilData.potassium) || 0,
        level: getNutrientLevel(parseFloat(soilData.potassium) || 0, [40, 70, 120, 200]),
      },
      {
        name: 'Ca',
        value: parseFloat(soilData.calcium) || 0,
        level: getNutrientLevel(parseFloat(soilData.calcium) || 0, [0.4, 1.2, 2.4, 4.0]),
      },
      {
        name: 'Mg',
        value: parseFloat(soilData.magnesium) || 0,
        level: getNutrientLevel(parseFloat(soilData.magnesium) || 0, [0.15, 0.45, 0.8, 1.5]),
      },
      {
        name: 'S',
        value: parseFloat(soilData.sulfur) || 0,
        level: getNutrientLevel(parseFloat(soilData.sulfur) || 0, [5, 10, 15, 20]),
      },
    ];

    microData = [
      {
        name: 'B',
        value: parseFloat(soilData.boron) || 0,
        level: getNutrientLevel(parseFloat(soilData.boron) || 0, [0.2, 0.4, 0.6, 0.9]),
      },
      {
        name: 'Cu',
        value: parseFloat(soilData.copper) || 0,
        level: getNutrientLevel(parseFloat(soilData.copper) || 0, [0.3, 0.8, 1.3, 2.0]),
      },
      {
        name: 'Fe',
        value: parseFloat(soilData.iron) || 0,
        level: getNutrientLevel(parseFloat(soilData.iron) || 0, [12, 30, 45, 90]),
      },
      {
        name: 'Mn',
        value: parseFloat(soilData.manganese) || 0,
        level: getNutrientLevel(parseFloat(soilData.manganese) || 0, [3, 6, 9, 12]),
      },
      {
        name: 'Zn',
        value: parseFloat(soilData.zinc) || 0,
        level: getNutrientLevel(parseFloat(soilData.zinc) || 0, [0.6, 1.2, 2.2, 5.0]),
      },
    ];
  } else {
    // PlantAnalysis - usar valores em g/kg
    const plantData = data as PlantAnalysisData;
    chartData = [
      {
        name: 'N',
        value: parseFloat(plantData.nitrogen) || 0,
        level: getNutrientLevel(parseFloat(plantData.nitrogen) || 0, [25, 30, 40, 50]),
      },
      {
        name: 'P',
        value: parseFloat(plantData.phosphorus) || 0,
        level: getNutrientLevel(parseFloat(plantData.phosphorus) || 0, [2.0, 2.5, 3.5, 5.0]),
      },
      {
        name: 'K',
        value: parseFloat(plantData.potassium) || 0,
        level: getNutrientLevel(parseFloat(plantData.potassium) || 0, [15, 20, 25, 35]),
      },
      {
        name: 'Ca',
        value: parseFloat(plantData.calcium) || 0,
        level: getNutrientLevel(parseFloat(plantData.calcium) || 0, [4, 6, 10, 15]),
      },
      {
        name: 'Mg',
        value: parseFloat(plantData.magnesium) || 0,
        level: getNutrientLevel(parseFloat(plantData.magnesium) || 0, [2.5, 3.0, 4.0, 6.0]),
      },
      {
        name: 'S',
        value: parseFloat(plantData.sulfur) || 0,
        level: getNutrientLevel(parseFloat(plantData.sulfur) || 0, [1.5, 2.0, 2.5, 4.0]),
      },
    ];
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visualização Gráfica dos Nutrientes</CardTitle>
        <CardDescription>
          {isSoilAnalysis ? 'Níveis de nutrientes no solo' : 'Teores foliares de nutrientes'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Macronutrientes */}
        <div>
          <h3 className="font-semibold mb-4">Macronutrientes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip 
                formatter={(value: number) => value.toFixed(2)}
                labelFormatter={(label) => `Nutriente: ${label}`}
              />
              <Legend />
              <Bar dataKey="value" name="Teor no Solo">
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={getColor(entry.level)} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4 text-xs">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-red-500 rounded"></div>
              <span>Muito Baixo</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-500 rounded"></div>
              <span>Baixo</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-yellow-500 rounded"></div>
              <span>Médio</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-green-500 rounded"></div>
              <span>Bom</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-blue-500 rounded"></div>
              <span>Muito Bom</span>
            </div>
          </div>
        </div>

        {/* Micronutrientes */}
        {isSoilAnalysis && microData.length > 0 && (
          <div>
            <h3 className="font-semibold mb-4">Micronutrientes</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={microData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip 
                  formatter={(value: number) => value.toFixed(2)}
                  labelFormatter={(label) => `Nutriente: ${label}`}
                />
                <Legend />
                <Bar dataKey="value" name="Teor no Solo">
                  {microData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getColor(entry.level)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </CardContent>
    </Card>
  );
}