import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

function TicketForm() {
  return (
    <div className="create-ticket-form">
      <form>
        <div class="form-group">
          <label>Title</label>
          <input type="text" class="form-control" placeholder="Ticket title" />
        </div>
        <div class="form-group">
          <label>Client</label>
          <select class="form-control">
            <option>Client 1</option>
            <option>Client 2</option>
            <option>Client 3</option>
          </select>
        </div>
        <div class="form-group">
          <label>Status</label>
          <select class="form-control">
            <option>Backlog</option>
            <option>In Progress</option>
            <option>Revisions</option>
            <option>Client Review</option>
            <option>Complete</option>
          </select>
        </div>
        <button type="submit" className="create-ticket-btn">
          Create Ticket
        </button>
      </form>
    </div>
  );
}

function CreateButton() {
  return (
    <Popover className="relative">
      <PopoverButton className="create-ticket-btn">
        Create Ticket
        <span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            fill="currentColor"
            class="bi bi-plus-square-fill"
            viewBox="0 0 16 16"
          >
            <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0" />
          </svg>
        </span>
      </PopoverButton>
      <PopoverPanel anchor="bottom" className="create-ticket-popup">
        <TicketForm />
      </PopoverPanel>
    </Popover>
  );
}

export default CreateButton;
