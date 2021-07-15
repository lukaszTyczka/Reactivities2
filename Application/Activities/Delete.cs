using System;
using System.Threading;
using System.Threading.Tasks;
using Application.core;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class Delete
    {
        public class Command : IRequest<Result<Unit>>
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, Result<Unit>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activityToDel = await _context.Activities.FindAsync(request.Id);

                // if(activityToDel == null) return null;
                
                _context.Remove(activityToDel);
                var  result = await _context.SaveChangesAsync() > 0;
                
                if(!result) return Result<Unit>.Failure("Failed to delete  the activity");

                return Result<Unit>.Success(Unit.Value);
            }
        }
    }
}