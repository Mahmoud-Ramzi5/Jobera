<?php
namespace App\Filters;

use Illuminate\Http\Request;

class JobFilter
{
    protected $safeParms = [
        'company_id' => ['eq'],
        'is_done' => ['eq'],
        'max_salary' => ['lte', 'gte', 'lt', 'gt'],
        'min_salary' => ['lte', 'gte', 'lt', 'gt'],
        'deadline' => ['lte', 'gte', 'lt', 'gt', 'eq'],
        'type' => ['eq']
    ];

    protected $operatorMap = [
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
