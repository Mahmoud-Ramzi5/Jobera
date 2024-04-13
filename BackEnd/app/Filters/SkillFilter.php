<?php
namespace App\Filters;

use Illuminate\Http\Request;

class SkillFilter{
    protected $safeParms =[
        'name' => ['eq', 'like'],
        'type' => ['eq'],
    ];

    protected $operatorMap=[
        'eq' => '=',
        'lt' => '<',
        'lte' => '<=',
        'gt' => '>',
        'gte' => '>=',
        'like' => 'LIKE'
    ];

    public function transform(Request $request)
    {
        $eleQuery = [];

        foreach ($this->safeParms as $parm => $operators) {
            $query = $request->query($parm);

            if (!isset($query)) {
                continue;
            }

            foreach ($operators as $operator) {
                if (isset($query[$operator])) {
                    if ($operator === 'like') {
                        $eleQuery[] = [$parm, $this->operatorMap[$operator], '%' . $query[$operator] . '%'];
                    } else {
                        $eleQuery[] = [$parm, $this->operatorMap[$operator], $query[$operator]];
                    }
                }
            }
        }

        return $eleQuery;
    }

}
